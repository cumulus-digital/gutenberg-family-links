<?php

namespace CUMULUS\Gutenberg\FamilyLinks;

/*
 * Plugin Name: Gutenberg Family Links Block
 * Plugin URI: https://github.com/cumulus-digital/gutenberg-family-links/
 * GitHub Plugin URI: https://github.com/cumulus-digital/gutenberg-family-links/
 * Primary Branch: main
 * Description: Block for inserting a page's children and/or siblings as links
 * Version: 0.0.9
 * Author: vena
 * License: UNLICENSED
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

/**
 * Pseudo-random GUID string generator
 */
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

function resolveBoxControl( $val ) {
	$resolved = [
		attr( $val, 'top' ) ? attr( $val, 'top' ) : '0',
		attr( $val, 'right' ) ? attr( $val, 'right' ) : '0',
		attr( $val, 'bottom' ) ? attr( $val, 'bottom' ) : '0',
		attr( $val, 'left' ) ? attr( $val, 'left' ) : '0',
	];

	if ( ( \count( \array_unique( $resolved ) ) === 1 ) ) {
		return attr( $val, 'top', 'inherit' );
	}

	return \trim( \implode( ' ', $resolved ) );
}

function implodeAssoc( $glue, $arr ) {
	$return = [];

	foreach ( $arr as $key => $val ) {
		$return[] = "{$key}: {$val};";
	}

	return \implode( ' ', $return );
}

class FamilyLinkWalker extends \Walker_Page {

	protected $current_object_id = 0;

	protected $is_backend = false;

	public function __construct() {
		$this->is_backend = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === \filter_input( \INPUT_GET, 'context', \FILTER_SANITIZE_STRING );

		if ( $this->current_object_id === 0 ) {
			if ( isset( $_GET['post_id'] ) ) {
				$this->current_object_id = $_GET['post_id'];
			} else {
				$this->current_object_id = \get_the_ID();
			}
		}
	}

	public function start_el( &$output, $data_object, $depth = 0, $args = [], $current_object_id = 0 ) {
		$newOutput = '';

		parent::start_el( $newOutput, $data_object, $depth, $args, $this->current_object_id );

		if ( $this->is_backend ) {
			$newOutput = \str_replace( '<a ', '<a onclick="event.preventDefault();" ', $newOutput );
		}

		$output .= $newOutput;
	}
}

function renderCallback( $attr, $content, $block ) {
	$is_backend   = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === \filter_input( \INPUT_GET, 'context', \FILTER_SANITIZE_STRING );
	$maxDepth     = attr( $attr, 'maxDepth', 0 );
	$parentPostId = 0;

	if ( isset( $_GET['post_id'] ) ) {
		$postId = $_GET['post_id'];
	} else {
		$postId = \get_the_ID();
	}

	if ( \array_key_exists( 'parentPostId', $attr ) ) {
		if ( $attr['parentPostId'] > 0 ) {
			$parent = \get_post( $attr['parentPostId'] );

			if ( ! $parent ) {
				return $attr['parentPostId'] . ' No such post exists.';
			}
			$parentPostId = $parent->ID;
			$postType     = \get_post_type( $parent );
		} else {
			$parentPostId = 0;
			$postType     = \get_post_type( $postId );
		}
	} else {
		// Default parent is the current page
		$parentPostId = $postId;
		$postType     = \get_post_type( $postId );
	}

	$exclude = [];

	if ( ! $attr['showCurrentChildren'] ) {
		$children = new \WP_Query( [
			'post_parent'    => $postId,
			'post_type'      => $postType,
			'fields'         => 'ids',
			'posts_per_page' => -1,
		] );
		$exclude = \array_merge( $exclude, $children->posts );
	}

	$defaults = [
		'post_type'   => $postType,
		'depth'       => $maxDepth,
		'sort_column' => 'menu_order,post_title',
		'title_li'    => '',
		'echo'        => false,
		'walker'      => new FamilyLinkWalker(),
	];
	$args = \array_merge( $defaults, [
		'child_of' => $parentPostId,
		'exclude'  => \implode( ',', $exclude ),
	] );

	if ( $attr['excludeNoindex'] ) {

		// Get list of page IDs where noindex is set in aioseo
		if ( \function_exists( 'aioseo' ) ) {
			$aioseo_query = \aioseo()->core->db
				->start( \aioseo()->core->db->db->posts . ' as p', true )
				->select( 'p.ID' )
				->leftJoin( 'aioseo_posts as ap', '`ap`.`post_id` = `p`.`ID`' )
				->where( 'p.post_status', 'publish' )
				->whereRaw( '`ap`.`robots_noindex` = 1' );

			$aioseo_exclude_ids = $aioseo_query->run( true, 'col' )
				->result();

			if ( $aioseo_exclude_ids && \count( $aioseo_exclude_ids ) ) {
				if ( ! \array_key_exists( 'exclude', $args ) ) {
					$args['exclude'] = '';
				} else {
					$args['exclude'] .= ',';
				}
				$args['exclude'] .= \implode( ',', $aioseo_exclude_ids );
			}
		}

		if ( ! \array_key_exists( 'meta_query', $args ) ) {
			$args['meta_query'] = [];
		}
		$args['meta_query'] = \array_merge( $args['meta_query'], [
			[
				'key'     => '_yoast_wpseo_meta-robots-noindex',
				'value'   => 1,
				'compare' => 'NOT EXISTS',
			],
			[
				'key'     => '_hide_from_sitemap',
				'compare' => 'NOT EXISTS',
			],
		] );
	}

	if ( \array_key_exists( 'excludeAdditionalIDs', $attr ) ) {
		if ( ! \is_array( $attr['excludeAdditionalIDs'] ) ) {
			$excludeAdditionalIDs = \explode( ',', $attr['excludeAdditionalIDs'] );
		} else {
			$excludeAdditionalIDs = $attr['excludeAdditionalIDs'];
		}

		if ( \count( $excludeAdditionalIDs ) ) {
			if ( ! \array_key_exists( 'exclude', $args ) ) {
				$args['exclude'] = '';
			} else {
				$args['exclude'] .= ',';
			}
			$args['exclude'] .= \implode( ',', $excludeAdditionalIDs );
		}
	}

	$pages = \wp_list_pages( $args );

	if ( ! $pages ) {
		return 'None found.';
	}

	$classes = \array_filter( [
		"is-style-{$attr['displayType']}",
		attr( $attr, 'textAlign' ) ? "has-text-align text-align-{$attr['textAlign']}" : null,
		attr( $attr, 'linkColor' ) ? 'has-link-color' : null,
		attr( $attr, 'linkColorHover' ) ? 'has-link-color-hover' : null,
		attr( $attr, 'underlineLinks', false ) ? 'has-underline-links' : 'has-no-underline-links',
		attr( $attr, 'underlineOnHover', false ) ? 'has-underline-links-hover' : 'has-no-underline-links-hover',
		attr( $attr, 'displayType' ) === 'custom' ? 'has-custom-bullet' : null,
	] );

	$marginDefault  = [ 'top' => null, 'right' => null, 'bottom' => null, 'left' => null];
	$itemMargin     = attr( $attr, 'itemMargin', $marginDefault );
	$childrenMargin = attr( $attr, 'childrenMargin', $marginDefault );
	$styleAttr      = \array_filter( [
		'custom-bullet'          => '"' . attr( $attr, 'customBullet' ) . '"',
		'bullet-color'           => attr( $attr, 'bulletColor' ),
		'item-margin-top'        => attr( $itemMargin, 'top' ),
		'item-margin-right'      => attr( $itemMargin, 'right' ),
		'item-margin-bottom'     => attr( $itemMargin, 'bottom' ),
		'item-margin-left'       => attr( $itemMargin, 'left' ),
		'children-margin-top'    => attr( $childrenMargin, 'top' ),
		'children-margin-right'  => attr( $childrenMargin, 'right' ),
		'children-margin-bottom' => attr( $childrenMargin, 'bottom' ),
		'children-margin-left'   => attr( $childrenMargin, 'left' ),
		'text-align'             => attr( $attr, 'textAlign' ),
		'link-color'             => attr( $attr, 'linkColor' ),
		'link-color-hover'       => attr( $attr, 'linkColorHover' ),
	] );

	// Only set current page styles if highlightCurrent is enabled
	if ( attr( $attr, 'highlightCurrent', false ) ) {
		$classes = \array_merge( $classes, \array_filter( [
			attr( $attr, 'currentLinkColor' ) ? 'has-current-link-color' : null,
			attr( $attr, 'currentLinkColorHover' ) ? 'has-current-link-color-hover' : null,
			attr( $attr, 'currentUnderlineLinks', false ) ? 'has-current-underline-link' : 'has-current-no-underline-link',
			attr( $attr, 'currentUnderlineOnHover', false ) ? 'has-current-underline-link-hover' : 'has-current-no-underline-link-hover',
		] ) );
		$styleAttr = \array_merge( $styleAttr, \array_filter( [
			'current-link-color'       => attr( $attr, 'currentLinkColor' ),
			'current-link-color-hover' => attr( $attr, 'currentLinkColorHover' ),
			'current-font-weight'      => attr( $attr, 'currentFontWeight' ),
			'current-font-style'       => attr( $attr, 'currentFontStyle' ),
			'current-font-size'        => attr( $attr, 'currentFontSize' ),
		] ) );
	}

	$params = [
		'class' => \implode( ' ', $classes ),
		'style' => \array_reduce( \array_keys( $styleAttr ), function ( $css, $key ) use ( $styleAttr ) {
			return "--{$key}: {$styleAttr[$key]};" . $css;
		} ),
	];
	\ob_start(); ?>
	<nav
		<?php
		// If in editor
		if ( $is_backend ) {
			foreach ( $params as $key => $val ) {
				echo "{$key}='{$val}' ";
			}
		} else {
			echo \get_block_wrapper_attributes( $params );
		} ?>
	>
		<ul>
			<?php echo $pages; ?>
		</ul>
	</nav>
	<?php

	return \ob_get_clean();
}

function list_children( \WP_REST_Request $request ) {
	if ( ! $request->has_param( 'type' ) ) {
		$request->set_param( 'type', 'page' );
	}

	if ( ! $request->has_param( 'child_of' ) ) {
		$request->set_param( 'child_of', 0 );
	}

	$children = \get_pages( [
		'type'        => $request->get_param( 'type' ),
		'child_of'    => $request->get_param( 'child_of' ),
		'sort_column' => 'menu_order',
		'sort_order'  => 'asc',
	] );

	if ( empty( $children ) ) {
		return new \WP_REST_Response( [], 200 );
	}

	$response = new \WP_REST_Posts_Controller( $request->get_param( 'type' ) );
	$return   = [];

	foreach ( $children as &$child ) {
		$return[] = $response->prepare_item_for_response( $child, $request )->data;
	}

	//$response = new \WP_REST_Posts_Controller( $request->get_param( 'type' ) );

	//return $return;

	return new \WP_REST_Response( $return, 200 );
}
\add_action( 'rest_api_init', function () {
	$namespace = 'cumulus-family-links/v1';
	\register_rest_route( $namespace, '/children-of/(?P<child_of>\d+)', [
		'methods'             => 'GET',
		'callback'            => __NAMESPACE__ . '\\list_children',
		'permission_callback' => function () {
			return \current_user_can( 'read' );
		},
	] );
} );
