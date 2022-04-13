import { PageSelector, ChildPagesSelector } from '../page-selector.jsx';
import CmlsServerSideRender from '../cmls-server-side-render.jsx';
import FontAppearanceControl from '../font-appearance-control.jsx';
import metadata from './block.json';

import {
	formatBold,
	formatItalic,
	formatCapitalize,
	formatLowercase,
	formatUppercase,
} from '@wordpress/icons';
import { isEqual } from 'lodash';

const { registerBlockType } = wp.blocks;
//const { serverSideRender: ServerSideRender } = wp;
const {
	//Disabled,
	//Panel,
	//PanelBody,
	PanelRow,
	BaseControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalUnitControl: UnitControl,
	__experimentalBoxControl: BoxControl,
	__experimentalToolsPanel: ToolsPanel,
	__experimentalToolsPanelItem: ToolsPanelItem,
	//FontSizePicker,
	//Toolbar,
	ToolbarGroup,
	ToolbarButton,
	//ToolbarItem,
	ToolbarDropdownMenu,
	//DropdownMenu,
	Flex,
	//FlexItem,
	//Button,
	TextControl,
	//Dropdown,
	//Icon,
	Spinner,
	__experimentalDivider: Divider
} = wp.components;
const {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	ColorPaletteControl,
	InspectorControls,
	FontSizePicker,
} = wp.blockEditor;
const { useEffect, useState } = wp.element;
//const { useSelect } = wp.data;

registerBlockType( metadata.name, {
	...metadata,

	edit: (props) => {
		const { attributes, setAttributes, clientId } = props;
		const blockProps = useBlockProps();
		var currentPost = wp.data.select('core/editor').getCurrentPost();
		var currentPostParentId = wp.data.select('core/editor').getEditedPostAttribute('parent');
		const [isLoadingPages, setIsLoadingPages] = useState(false);

		function getDefault(key) {
			if (metadata.attributes.hasOwnProperty(key) && metadata.attributes[key].hasOwnProperty('default')) {
				return metadata.attributes[key].default;
			}
			return undefined;
		}
		function isDefault(keys) {
			keys = Array.isArray(keys) ? keys : [keys];
			const test = keys.some((key) => {
				return ! isEqual(attributes[key], getDefault(key));
			});
			return ! test;
		}
		function setDefault(keys) {
			keys = Array.isArray(keys) ? keys : [keys];
			const attrs = {}
			keys.forEach((key) => {
				attrs[key] = getDefault(key);
			});
			setAttributes(attrs);
		}

		function initParentPostId() {
			if ( ! attributes.parentPostId) {
				currentPost = wp.data.select('core/editor').getCurrentPost();
				currentPostParentId = wp.data.select('core/editor').getEditedPostAttribute('parent');
				if (attributes.showSiblings && attributes.parentPostId !== currentPostParentId) {
					setAttributes({ 'parentPostId': parseInt(currentPostParentId) });
					//attributes.parentPostId = currentPostParentId;
				} else if (currentPost.id) {
					setAttributes({ 'parentPostId': parseInt(currentPost.id) });
					//attributes.parentPostId = currentPost.id;
				} else {
					//setAttributes({ 'parentPostId': null });
				}
			}
		}
		useEffect(initParentPostId);

		// Clean up deprecated value
		useEffect(() => {
			if (attributes.currentFontWeight === 'bold') {
				setAttributes({ currentFontWeight: '700' });
			}
		});

		const updateTypography = (key, val) => {
			let newTypo = {};
			newTypo[key] = val;
			let newAttr = {
				...attributes,
				style: {
					...attributes.style,
					typography: {
						...attributes.style?.typography,
						...newTypo
					}
				}
			};
			if (!val) {
				delete newAttr.style.typography[key];
			}
			console.log(newAttr);
			setAttributes(newAttr);
		}

		const MySpinner = () => {
			return (
				<>
					<Spinner />
					<small>Loading Family&hellip;</small>
				</>
			);
		}

		return (
			<div {...blockProps}>
				<InspectorControls>
					<ToolsPanel
						label="Query Control"
						resetAll={(cbs) => cbs.foreach(cb => cb())}
					>
						<ToolsPanelItem
							hasValue={() => { return true }}
							label="Parent Context"
							isShownByDefault={true}
						>
							<PageSelector
								label="Parent Context"
								help="Select the page to draw children from."
								parentPostId={attributes.parentPostId}
								onChange={(val) => {
									if (!val && val !== 0) {
										val = undefined;
									}
									setAttributes({ parentPostId: val });
								}}
								onLoading={(state) => {
									setIsLoadingPages(state);
								}}
							/>

							{attributes.parentPostId !== currentPost.id && (
								<BaseControl>
									<p>If the <strong>current page</strong> is in the parent context's hierarchy:</p>
									<ToggleControl
										label="Include This Page's Children"
										checked={attributes.showCurrentChildren}
										onChange={(val) => setAttributes({ showCurrentChildren: val })}
									/>
								</BaseControl>
							)}

						</ToolsPanelItem>

						<ToolsPanelItem
							label="Max Depth"
							hasValue={() => { return !isDefault('maxDepth') }}
							resetAllFilter={() => {
								setDefault(['maxDepth']);
							}}
						>
							{attributes.parentPostId != null && (
								<RangeControl
									label="Maximum depth of children to display"
									allowReset
									resetFallbackValue={0}
									step={1}
									type="stepper"
									withInputField={false}
									marks={[
										{
											value: 0,
											label: 'All',
										},
										...[1,2,3,4,5,6].map((i) => {
											return {
												value: i,
												label: i
											}
										})
									]}
									value={attributes.maxDepth}
									onChange={(val) => setAttributes({ maxDepth: val })}
									min={0}
									max={6}
								/>
							)}
						</ToolsPanelItem>

						{attributes.parentPostId != null && (
							<ToolsPanelItem
								label="Exclusions"
								hasValue={() => { return ! isDefault('excludeAdditionalIDs') }}
								resetAllFilter={() => {
									setDefault(['excludeAdditionalIDs', 'excludeNoindex']);
								}}
							>
								<ChildPagesSelector
									label="Exclude Specific Child Pages"
									help={
										`Select multiple or deselect an item by holding
												${(navigator?.userAgentData?.platform || navigator?.platform || 'unknown').toUpperCase().indexOf('MAC') == 0 ? 'Command (⌘)' : 'Control'}
												while clicking.`
									}
									parentPostId={attributes.parentPostId}
									value={attributes.excludeAdditionalIDs}
									onChange={(val) => setAttributes({ excludeAdditionalIDs: val })}
								/>

								{attributes.excludeAdditionalIDs.length > 0 && (
									<TextControl
										label="Raw excluded page IDs"
										value={attributes.excludeAdditionalIDs.join(',')}
										onChange={(val) => {
											const excludes = val.match(/(?<id>\d+)/);
											if (excludes?.groups?.id && excludes?.groups?.id?.length) {
												setAttributes({ excludeAdditionalIDs: val });
											} else {
												setAttributes({ excludeAdditionalIDs: [] })
											}
										}}
									/>
								)}

								<ToggleControl
									label="Automatically exclude pages marked 'noindex' in popular SEO plugins."
									checked={attributes.excludeNoindex}
									onChange={(val) => setAttributes({ excludeNoindex: val })}
								/>
							</ToolsPanelItem>
						)}
					</ToolsPanel>
					<ToolsPanel
						label="List Style"
						resetAll={(cbs) => {
							cbs.forEach(cb => cb());
						}}
					>
						<ToolsPanelItem
							label="Display Type"
							isShownByDefault={true}
							hasValue={() => { return ! isDefault('displayType') }}
							resetAllFilter={() => {
								setDefault(['displayType']);
							}}
						>
							<SelectControl
								label="Display Type"
								labelPosition="side"
								value={attributes.displayType}
								onChange={(val) => setAttributes({ displayType: val })}
								options={metadata.attributes.displayType.enum.map((opt) => {
									return { value: opt, label: opt.charAt(0).toUpperCase() + opt.slice(1) };
								})}
							/>
						</ToolsPanelItem>

						{attributes.displayType !== 'plain' && (
							<ToolsPanelItem
								isShownByDefault={true}
								label="Bullet Style"
								hasValue={() => { return ! isDefault(['customBullet', 'bulletColor']) }}
								resetAllFilter={() => setDefault(['customBullet', 'bulletColor'])}
							>
								{attributes.displayType == 'custom' && (
									<PanelRow>
										<TextControl
											label="Custom Bullet"
											value={attributes.customBullet}
											style={{width: '10ch'}}
											onChange={(val) => setAttributes({ customBullet: val.substring(0, 1) })}
										/>
									</PanelRow>
								)}

								<PanelRow>
									<ColorPaletteControl
										label="Bullet Color"
										value={attributes.bulletColor}
										onChange={(val) => setAttributes({ bulletColor: val })}
									/>
								</PanelRow>
							</ToolsPanelItem>
						)}

						<ToolsPanelItem
							label="Item Margins"
							hasValue={() => { return ! isDefault(['itemMargin', 'childrenMargin']); }}
							resetAllFilter={() => {
								setDefault(['itemMargin', 'childrenMargin']);
							}}
						>
							<PanelRow>
								<BoxControl
									label="Item Margin"
									values={{
										top: attributes.itemMargin?.top,
										right: attributes.itemMargin?.right,
										bottom: attributes.itemMargin?.bottom,
										left: attributes.itemMargin?.left,
									}}
									onChange={(val) => setAttributes({ itemMargin: val })}
								/>
							</PanelRow>

							<PanelRow>
								<BoxControl
									label="Children Container Margin"
									values={{
										top: attributes.childrenMargin?.top,
										right: attributes.childrenMargin?.right,
										bottom: attributes.childrenMargin?.bottom,
										left: attributes.childrenMargin?.left,
									}}
									onChange={(val) => setAttributes({ childrenMargin: val })}
								/>
							</PanelRow>

						</ToolsPanelItem>
					</ToolsPanel>

					<ToolsPanel
						label="Link Styles"
						resetAll={(cbs) => {
							cbs.forEach(cb => cb());
						}}
					>
						<ToolsPanelItem
							label="All Links"
							hasValue={() => {
								return ! isDefault([
									'linkColor',
									'linkColorHover',
									'underlineLinks',
									'underlineOnHover'
								])
							}}
							resetAllFilter={() => {
								setDefault([
									'linkColor',
									'linkColorHover',
									'underlineLinks',
									'underlineOnHover'
								]);
							}}
						>

							<PanelRow>
								<ColorPaletteControl
									label="Link Color"
									value={attributes.linkColor}
									onChange={(val) => setAttributes({ linkColor: val })}
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label="Underline Links"
									checked={attributes.underlineLinks}
									onChange={(val) => setAttributes({ underlineLinks: val })}
								/>
							</PanelRow>

							<PanelRow>
								<ColorPaletteControl
									label="Hover Link Color"
									value={attributes.linkColorHover}
									onChange={(val) => setAttributes({ linkColorHover: val })}
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label="Underline Links on Hover"
									checked={attributes.underlineOnHover}
									onChange={(val) => setAttributes({ underlineOnHover: val })}
								/>
							</PanelRow>

						</ToolsPanelItem>

						<ToolsPanelItem
							label="Current Page"
							hasValue={() => {
								return ! isDefault([
									'highlightCurrent',
									'currentFontSize',
									'currentFontWeight',
									'currentFontStyle',
									'currentLinkColor',
									'currentUnderlineLinks',
									'currentLinkColorHover',
									'currentUnderlineOnHover'
								]);
							}}
							resetAllFilter={() => {
								setDefault([
									'highlightCurrent',
									'currentFontSize',
									'currentFontWeight',
									'currentFontStyle',
									'currentLinkColor',
									'currentUnderlineLinks',
									'currentLinkColorHover',
									'currentUnderlineOnHover'
								]);
							}}
						>

							<h3>Current Page Highlight</h3>

							<ToggleControl
								label="Highlight Current Page"
								checked={attributes.highlightCurrent}
								onChange={(val) => {
									setAttributes({ highlightCurrent: val });
								}}
							/>

							{attributes.highlightCurrent && (

								<>
									<PanelRow>
										<Flex gap={2}>
											<FontSizePicker
												label="Current Page Font Size"
												value={attributes.currentFontSize}
												onChange={val => setAttributes({ currentFontSize: val })}
											/>
											<FontAppearanceControl
												value={{ fontStyle: attributes.currentFontStyle, fontWeight: attributes.currentFontWeight }}
												onChange={val => setAttributes({
													currentFontStyle: val.fontStyle,
													currentFontWeight: val.fontWeight
												})}
											/>
										</Flex>
									</PanelRow>

									<PanelRow>
										<ColorPaletteControl
											label="Current Page Link Color"
											value={attributes.currentLinkColor}
											onChange={(val) => setAttributes({ currentLinkColor: val })}
										/>
									</PanelRow>
									<PanelRow>
										<ToggleControl
											label="Underline Current Page Link"
											checked={attributes.currentUnderlineLinks}
											onChange={(val) => setAttributes({ currentUnderlineLinks: val })}
										/>
									</PanelRow>

									<PanelRow>
										<ColorPaletteControl
											label="Current Page Link Hover Color"
											value={attributes.currentLinkColorHover}
											onChange={(val) => setAttributes({ currentLinkColorHover: val })}
										/>
									</PanelRow>
									<PanelRow>
										<ToggleControl
											label="Underline Current Page Link on Hover"
											checked={attributes.currentUnderlineOnHover}
											onChange={(val) => setAttributes({ currentUnderlineOnHover: val })}
										/>
									</PanelRow>
								</>
							)}

						</ToolsPanelItem>
					</ToolsPanel>
				</InspectorControls>

				<BlockControls>
					<AlignmentToolbar
						value={ attributes.textAlign }
						onChange={(nextAlign) => setAttributes({ textAlign: nextAlign })}
					/>

					<ToolbarGroup>
						<ToolbarDropdownMenu
							icon={
								attributes.style?.typography?.textTransform ?
									attributes.style?.typography?.textTransform === 'uppercase' ? formatUppercase :
										attributes.style?.typography?.textTransform === 'lowercase' ? formatLowercase : formatCapitalize
									: formatCapitalize
							}
							label="Letter Case"
							controls={[
								{
									title: 'Normal',
									icon: formatCapitalize,
									isActive: !attributes.style?.typography?.textTransform,
									onClick: () => updateTypography('textTransform', null)
								},
								{
									title: 'UPPERCASE',
									isActive: attributes.style?.typography?.textTransform === 'uppercase',
									icon: formatUppercase,
									onClick: () => updateTypography('textTransform', 'uppercase')
								},
								{
									title: 'Capitalize',
									isActive: attributes.style?.typography?.textTransform === 'capitalize',
									icon: formatCapitalize,
									onClick: () => updateTypography('textTransform', 'capitalize'),
								},
								{
									title: 'lowercase',
									isActive: attributes.style?.typography?.textTransform === 'lowercase',
									icon: formatLowercase,
									onClick: () => updateTypography('textTransform', 'lowercase'),
								},
							]}
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarButton
							icon={formatBold}
							label="Bold"
							isPressed={
								attributes.style?.typography?.fontWeight
								&& attributes.style?.typography?.fontWeight === 700
							}
							onClick={() => updateTypography(
								'fontWeight',
								attributes.style?.typography?.fontWeight === 700 ? null : 700
							)}
						/>
						<ToolbarButton
							icon={formatItalic}
							label="Italic"
							isPressed={
								attributes.style?.typography?.fontStyle
								&& attributes.style?.typography?.fontStyle !== 'normal'
							}
							onClick={() => updateTypography(
								'fontStyle',
								attributes.style?.typography?.fontStyle === 'italic' ? null : 'italic'
							)}
						/>
					</ToolbarGroup>
				</BlockControls>

				{attributes.parentPostId === null && (
					<MySpinner />
				)}
				{attributes.parentPostId && (
					<CmlsServerSideRender
						block={metadata.name}
						attributes={attributes}
						urlQueryArgs={{ post_id: currentPost.id }}
						LoadingResponsePlaceholder={MySpinner}
					/>
				)}
			</div>
		);
	},
} );