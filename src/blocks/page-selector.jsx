/**
 * Page selector component, semi-replicates WP's own parent page selector
 */
import {
	//get,
	//unescape as unescapeString,
//	debounce,
	//repeat,
	find,
	flatten,
	deburr,
	groupBy,
	isEqual,
} from 'lodash';
const {
//	ComboboxControl,
//	FormTokenField,
	TreeSelect,
	Disabled,
	Spinner,
	Flex
} = wp.components;
const {
	useState,
//	useMemo,
	useEffect,
	useCallback
} = wp.element;
const { usePrevious } = wp.compose;
//const { useSelect, useDispatch } = wp.data;
const { decodeEntities } = wp.htmlEntities;
//const { store: coreStore } = wp.coreData;
const { addQueryArgs } = wp.url;
const { __ } = wp.i18n;

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
	if (termsByParent['0']) {
		return fillWithChildren(termsByParent['0']);
	}
	if (Object.values(termsByParent).length) {
		return fillWithChildren(Object.values(termsByParent)[0]);
	}
	return [];
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

function buildPageList(props, searchValue = false, beginTreeFrom = null) {

	const currentPostType = props.postType ? props.postType : wp.data.select('core/editor').getCurrentPostType();
	const pageId = props?.parentPostId ? props.parentPostId : wp.data.select('core/editor').getCurrentPostId();
	let parentPost = pageId;
	let postType = null;
	let isHierarchical = false;
	let items = [];
	let options = [];

	return new Promise((resolve, reject) => {
		// get details about current post type
		wp.apiFetch({
			path: addQueryArgs(`/wp/v2/types/${currentPostType}`, { context: 'view' })
		}).then(type => {

			postType = type;
			isHierarchical = type.hierarchical;

			if (!isHierarchical) {
				setOptions([]);
				resolve(options);
				return;
			}

			const query = {
				type: postType.slug,
				per_page: -1,
				orderby: 'menu_order',
				order: 'asc',
				context: 'view'
			};
			if (!!searchValue) {
				query.search = searchValue;
			}
			let path = beginTreeFrom ?
				`/cumulus-family-links/v1/children-of/${pageId}` :
				`/${postType.rest_namespace}/${postType.rest_base}`;

			// get child pages
			wp.apiFetch({
				path: addQueryArgs(path, query)
			}).then((pages) => {
				if (pages && pages.length) {
					items = pages;

					// Build options!
					/*
					const getOptionsFromTree = (tree, level = 0) => {
						const mappedNodes = tree.map((treeNode) => [
							{
								value: treeNode.id,
								label:
									repeat('• ', level) + unescapeString(treeNode.name),
								rawName: treeNode.name,
							},
							...getOptionsFromTree(treeNode.children || [], level + 1),
						]);

						const sortedNodes = mappedNodes.sort(([a], [b]) => {
							const priorityA = getItemPriority(a.rawName, searchValue);
							const priorityB = getItemPriority(b.rawName, searchValue);
							return priorityA >= priorityB ? 1 : -1;
						});
						return flatten(sortedNodes);
					};
					*/

					let tree = items.map((item) => ({
						id: item.id,
						parent: item.parent,
						name: getTitle(item),
					}));

					// Only build a hierarchical tree when not searching.
					//if (!searchValue) {
						tree = buildTermsTree(tree);
					//}
					resolve(tree);
					return;

					const opts = getOptionsFromTree(tree);

					// Ensure the current parent is in the options list.
					if (!beginTreeFrom) {
						const optsHasParent = find(
							opts,
							(item) => item.value === pageId
						);
						if (parentPost && !optsHasParent) {
							opts.unshift({
								value: parentPost.id,
								label: getTitle(parentPost),
							});
						}
					}
					options = opts;
					resolve(options);
				}
			});
		});
	});

}

export function ChildPagesSelector(props) {
	const [postOptions, setPostOptions] = useState([]);
	const [selected, setSelected] = useState(props.value);
	const [prevSelected, setPrevSelected] = useState([]);
	const prevProps = usePrevious(props);
	const [isLoading, setIsLoading] = useState("Loading...");

	useEffect(() => {
		if (!prevSelected) {
			setPrevSelected(selected);
		}
		if (!isEqual(prevProps, props)) {
			setIsLoading(true);
			const fetchOptions = new buildPageList(props, false, props.parentPostId ? props.parentPostId : null);
			fetchOptions.then(options => {
				setPostOptions(options);
				const flattenIds = (items) => {
					const ret = items.map(item => {
						return [
							item.id.toString(),
							...flattenIds(item.children || [])
						]
					});
					return flatten(ret);
				}
				const postIds = flattenIds(options);
				const tokenIds = selected;
				const newTokens = postIds.filter(i => tokenIds.includes(i));
				console.log({
					postIds: postIds,
					tokenIds: tokenIds,
					newTokens: newTokens,
					props: props
				});
				handleChange(newTokens);
				setIsLoading(false);
			});
		}
	}, [props.parentPostId]);

	useEffect(() => {
		if (props.onLoading) {
			props.onLoading(isLoading);
		}
	}, [isLoading]);

	const handleChange = tokens => {
		console.log({ selected: tokens });
		setPrevSelected(selected);
		setSelected(tokens);
		if (props.onChange) {
			props.onChange(tokens);
		}
	};

	const control = (
		<TreeSelect
			multiple={true}
			label={props.label}
			help={props.help}
			tree={postOptions}
			selectedId={selected}
			disabled={postOptions.length ? false : true}
			onChange={handleChange}
			style={{ height: 'auto', maxHeight: '6em', padding: '8px', lineHeight: 1.2 }}
		/>
	);

	if (isLoading) {
		return (
			<Disabled>
				<Flex align="center" justify="left" style={{ marginBottom: '10px' }}>
					<Spinner /> Loading children...
				</Flex>
			</Disabled>
		);
	}

	return control;

}

export function PageSelector(props) {
	const [fieldValue, setFieldValue] = useState(false);
	const [selected, setSelected] = useState(props.parentPostId);
	const [prevSelected, setPrevSelected] = useState(null);
	const prevProps = usePrevious(props);
	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState("Loading...");
	const parentPageLabel = props.label || "Select a Page";
	const parentPageHelp = props.help || null;
	const noOptionLabel = props.noOptionLabel || 'No page selected';

	const loadPages = useCallback(() => {
		if (!prevSelected) {
			setPrevSelected(selected);
		}
		if (! isEqual(prevProps, props)) {
			setIsLoading(true);
			const fetchOptions = new buildPageList({ postType: props.postType, parentPostId: selected }, fieldValue);
			fetchOptions.then(options => {
				setIsLoading(false);
				setOptions([
					{
						'id': 0,
						'name': 'All pages'
					},
					...options
				]);
				if (props.parentPostId) {
					setPrevSelected(selected);
					setSelected(props.parentPostId);
				}
			});
		}
	});
	useEffect(loadPages, [props.parentPostId]);

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
		setPrevSelected(selected);
		setSelected(selectedPostId);
		setFieldValue(false);
		if (props.onChange) {
			props.onChange(selectedPostId);
		}
	};

	useEffect(() => {
		if (props.onLoading) {
			props.onLoading(isLoading);
		}
	}, [isLoading]);

	const control = (
		<TreeSelect
			className="editor-page-attributes__parent"
			label={parentPageLabel}
			help={parentPageHelp}
			noOptionLabel={isLoading ? 'Loading...' : noOptionLabel}
			selectedId={selected}
			tree={options}
			onChange={handleChange}
			style={{ lineHeight: 1.2 }}
		/>
	);

	if (isLoading) {
		return (
			<Disabled>
				<div style={{ position: 'relative' }}>
					{control}
					<div style={{ position: 'absolute', top: '-5px', right: '0' }}>
						<Spinner />
					</div>
				</div>
			</Disabled>
		);
	}

	return control;
}

export default PageSelector;