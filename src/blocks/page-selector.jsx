/**
 * Page selector component, semi-replicates WP's own parent page selector
 */
import {
	get,
	unescape as unescapeString,
	debounce,
	repeat,
	find,
	flatten,
	deburr,
	groupBy,
} from 'lodash';
const { ComboboxControl } = wp.components;
const { useState, useMemo } = wp.element;
const { useSelect, useDispatch } = wp.data;
const { decodeEntities } = wp.htmlEntities;
const { store: coreStore } = wp.coreData;

// https://github.com/WordPress/gutenberg/blob/ecfeb256bf5f43d6c70d6ae45ffb5cad7daee34f/packages/editor/src/utils/terms.js#L13
function buildTermsTree(flatTerms) {
	const flatTermsWithParentAndChildren = flatTerms.map((term) => {
		return {
			children: [],
			parent: null,
			...term,
		};
	});

	const termsByParent = groupBy(flatTermsWithParentAndChildren, 'parent');
	if (termsByParent.null && termsByParent.null.length) {
		return flatTermsWithParentAndChildren;
	}
	const fillWithChildren = (terms) => {
		return terms.map((term) => {
			const children = termsByParent[term.id];
			return {
				...term,
				children:
					children && children.length
						? fillWithChildren(children)
						: [],
			};
		});
	};

	return fillWithChildren(termsByParent['0'] || []);
}


function getTitle(post) {
	return post?.title?.rendered
		? decodeEntities(post.title.rendered)
		: `#${post.id} (${__('no title')})`;
}

export const getItemPriority = (name, searchValue) => {
	const normalizedName = deburr(name).toLowerCase();
	const normalizedSearch = deburr(searchValue).toLowerCase();
	if (normalizedName === normalizedSearch) {
		return 0;
	}

	if (normalizedName.startsWith(normalizedSearch)) {
		return normalizedName.length;
	}

	return Infinity;
};

export function PageAttributesSelector(props) {
	const [fieldValue, setFieldValue] = useState(false);
	const { parentPost, parentPostId, items, postType } = useSelect(
		(select) => {
			const { getPostType, getEntityRecords, getEntityRecord } = select(
				coreStore
			);
			const postTypeSlug = wp.data.select('core/editor').getCurrentPostType();
			const pageId = props.parentPostId;// || wp.data.select('core/editor').getCurrentPostAttribute('parent');
			const pType = getPostType(postTypeSlug);
			const isHierarchical = get(pType, ['hierarchical'], false);
			const query = {
				per_page: 100,
				orderby: 'menu_order',
				order: 'asc',
				_fields: 'id,title,parent',
			};

			// Perform a search when the field is changed.
			if (!!fieldValue) {
				query.search = fieldValue;
			}

			return {
				parentPostId: pageId,
				parentPost: pageId
					? getEntityRecord('postType', postTypeSlug, pageId)
					: null,
				items: isHierarchical
					? getEntityRecords('postType', postTypeSlug, query)
					: [],
				postType: pType,
			};
		},
		[fieldValue]
	);

	const isHierarchical = get(postType, ['hierarchical'], false);
	const parentPageLabel = props.label || "Select a Page or Post";
	const pageItems = items || [];

	const parentOptions = useMemo(() => {
		const getOptionsFromTree = (tree, level = 0) => {
			const mappedNodes = tree.map((treeNode) => [
				{
					value: treeNode.id,
					label:
						repeat('— ', level) + unescapeString(treeNode.name),
					rawName: treeNode.name,
				},
				...getOptionsFromTree(treeNode.children || [], level + 1),
			]);

			const sortedNodes = mappedNodes.sort(([a], [b]) => {
				const priorityA = getItemPriority(a.rawName, fieldValue);
				const priorityB = getItemPriority(b.rawName, fieldValue);
				return priorityA >= priorityB ? 1 : -1;
			});

			return flatten(sortedNodes);
		};

		let tree = pageItems.map((item) => ({
			id: item.id,
			parent: item.parent,
			name: getTitle(item),
		}));

		// Only build a hierarchical tree when not searching.
		if (!fieldValue) {
			tree = buildTermsTree(tree);
		}

		const opts = getOptionsFromTree(tree);

		// Ensure the current parent is in the options list.
		const optsHasParent = find(
			opts,
			(item) => item.value === props.parentPostId
		);
		if (parentPost && !optsHasParent) {
			opts.unshift({
				value: props.parentPostId,
				label: getTitle(parentPost),
			});
		}
		return opts;
	}, [pageItems, fieldValue]);

	if (!isHierarchical || !parentPageLabel) {
		return null;
	}
	/**
	 * Handle user input.
	 *
	 * @param {string} inputValue The current value of the input field.
	 */
	const handleKeydown = (inputValue) => {
		setFieldValue(inputValue);
	};

	/**
	 * Handle author selection.
	 *
	 * @param {Object} selectedPostId The selected Author.
	 */
	const handleChange = (selectedPostId) => {
		if (props.onChange) {
			props.onChange(selectedPostId);
		}
	};

	return (
		<ComboboxControl
			className="editor-page-attributes__parent"
			label={parentPageLabel}
			value={props.parentPostId}
			options={parentOptions}
			onFilterValueChange={debounce(handleKeydown, 300)}
			onChange={handleChange}
		/>
	);
}

export default PageAttributesSelector;