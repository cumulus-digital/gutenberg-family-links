<?php

namespace CUMULUS\Gutenberg\FamilyLinks;

use WP_Query;

/*
 * Plugin Name: Gutenberg Family Links Block
 * Plugin URI: https://github.com/cumulus-digital/gutenberg-family-links/
 * GitHub Plugin URI: https://github.com/cumulus-digital/gutenberg-family-links/
 * Primary Branch: main
 * Description: Block for inserting a page's children and/or siblings as links
 * Version: 0.0.1
 * Author: vena
 * License: UNLICENSED
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

function GUID() {
	if ( \function_exists( 'com_create_guid' ) === true ) {
		return \trim( com_create_guid(), '{}' );
	}

	return \sprintf( '%04X%04X-%04X-%04X-%04X-%04X%04X%04X', \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 16384, 20479 ), \mt_rand( 32768, 49151 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ), \mt_rand( 0, 65535 ) );
}

// Custom Block Category
\add_filter( 'block_categories_all', function ( $categories ) {
	if ( ! \array_search( 'cmls', \array_column( $categories, 'slug' ) ) ) {
		$categories = \array_merge(
			$categories,
			[
				[
					'slug'  => 'cmls',
					'title' => 'Cumulus',
					'icon'  => null,
				],
			]
		);
	}

	return $categories;
}, 10, 1 );

// Editor Assets
function editor_assets() {
	if ( ! \is_post_type_hierarchical( \get_post_type() ) ) {
		return;
	}

	\wp_enqueue_style(
		'gutenberg_family_links-css',
		\plugins_url( 'build/global.css', __FILE__ )
	);

	$assets = include \plugin_dir_path( __FILE__ ) . 'build/backend.asset.php';
	\wp_enqueue_script(
		'gutenberg_family_links-backend-js', // Handle.
		\plugins_url( 'build/backend.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_assets' );

// Frontend Assets
function frontend_block_assets() {
	if ( \has_block( 'cumulus-gutenberg/family-links' ) && ! \is_admin() ) {

		// Block assets
		\wp_enqueue_style(
			'gutenberg_family_links-css',
			\plugins_url( 'build/global.css', __FILE__ )
		);
	}
}
\add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\frontend_block_assets' );

// Server-side renderer
\add_action( 'init', function () {
	if ( ! \function_exists( 'register_block_type_from_metadata' ) ) {
		return;
	}

	\register_block_type_from_metadata(
		__DIR__ . '/src/blocks/family-links/block.json',
		[
			'render_callback' => __NAMESPACE__ . '\\renderCallback',
		]
	);
} );

function attr( $attr, $key, $default = null ) {
	if ( isset( $attr[$key] ) ) {
		return $attr[$key];
	}

	return $default;
}

function renderCallback( $attr, $content, $block ) {
	$depth        = isset( $attr['depth'] ) ? $attr['depth'] : 0;
	$parentPostId = -1;

	if ( \array_key_exists( 'parentPostId', $attr ) && $attr['parentPostId'] > 0 ) {
		$parent = \get_post( $attr['parentPostId'] );

		if ( ! $parent ) {
			return $attr['parentPostId'] . ' No such post exists.';
		}
		$parentPostId = $parent->ID;
		$postType     = \get_post_type( $parent );
	} else {
		if ( isset( $_GET['post_id'] ) ) {
			$postId = $_GET['post_id'];
		} else {
			$postId = \get_the_ID();
		}

		$parentPostId = \get_post( $postId )->parent;
	}

	$exclude = [];

	if ( ! $attr['showChildren'] ) {
		$children = new WP_Query( [
			'post_parent'    => $postId,
			'post_type'      => $postType,
			'fields'         => 'ids',
			'posts_per_page' => -1,
		] );
		$exclude = \array_merge( $exclude, $children->posts );
	}

	$defaults = [
		'post_type'   => $postType,
		'depth'       => $depth,
		'sort_column' => 'menu_order,post_title',
		'title_li'    => '',
		'echo'        => false,
	];
	$args = \array_merge( $defaults, [
		'child_of' => $parentPostId,
		'exclude'  => \implode( ',', $exclude ),
	] );
	$pages = \wp_list_pages( $args );

	if ( ! $pages ) {
		return 'None found.';
	}

	$id = 'family-links-' . GUID();

	$classes = \array_filter( [
		"is-style-{$attr['displayType']}",
		attr( $attr, 'textAlign' ) ? "has-text-align text-align-{$attr['textAlign']}" : null,
		attr( $attr, 'linkColor' ) ? 'has-link-color' : null,
		attr( $attr, 'linkColorHover' ) ? 'has-link-color-hover' : null,
		isset( $attr['underlineLinks'] ) && ! $attr['underlineLinks'] ? 'has-no-underline-links' : null,
		isset( $attr['underlineOnHover'] ) && ! $attr['underlineOnHover'] ? 'has-no-underline-links-hover' : null,
	] );

	$styleAttr = \array_filter( [
		'child-indent'     => attr( $attr, 'childIndent' ),
		'text-align'       => attr( $attr, 'textAlign' ),
		'link-color'       => attr( $attr, 'linkColor' ),
		'link-color-hover' => attr( $attr, 'linkColorHover' ),
	] );

	\ob_start(); ?>
	<?php if ( \defined( 'REST_REQUEST' ) && REST_REQUEST ): ?>
		<nav id="<?php echo $id; ?>" class="<?php echo \implode( ' ', $classes ); ?>">
	<?php else: ?>
		<nav <?php echo \get_block_wrapper_attributes( ['id' => $id, 'class' => \implode( ' ', $classes )] ); ?>>
	<?php endif; ?>
		<?php if ( \count( $styleAttr ) ): ?>
		<style>
			#<?php echo $id; ?> {
				<?php foreach ( $styleAttr as $key => $val ): ?>
					--<?php echo $key; ?>: <?php echo $val; ?>;
				<?php endforeach; ?>
			}
		</style>
		<?php endif; ?>
		<ul>
			<?php echo $pages; ?>
		</ul>
	</nav>
	<?php

	return \ob_get_clean();
}
