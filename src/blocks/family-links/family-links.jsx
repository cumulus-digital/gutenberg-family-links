import { default as PageSelector } from '../page-selector.jsx';
import metadata from './block.json';

import {
	formatBold,
	formatItalic,
	formatCapitalize,
	formatLowercase,
	formatUppercase,
} from '@wordpress/icons';

const { registerBlockType } = wp.blocks;
const { serverSideRender: ServerSideRender } = wp;
const {
	Disabled,
	Panel,
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalUnitControl: UnitControl,
	FontSizePicker,
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
	ToolbarItem,
	ToolbarDropdownMenu,
	DropdownMenu,
	Flex,
	FlexItem,
	Button,
	TextControl,
	Dropdown,
	Icon,
	Spinner,
	__experimentalBoxControl: BoxControl
} = wp.components;
const {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	ColorPaletteControl,
	InspectorControls,
} = wp.blockEditor;
const { useEffect } = wp.element;
const { useSelect } = wp.data;

registerBlockType( metadata.name, {
	...metadata,

	edit: (props) => {
		const { attributes, setAttributes, clientId } = props;
		const blockProps = useBlockProps();
		var currentPost = wp.data.select('core/editor').getCurrentPost();
		var currentPostParentId = wp.data.select('core/editor').getEditedPostAttribute('parent');

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
					setAttributes({ 'parentPostId': 0 });
				}
			}
		}
		useEffect(initParentPostId);

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
					<Panel>
						<PanelBody title="Query Control">

							<PageSelector
								label="Parent Context"
								help={(
									<>
										Select the page to draw children from.<br />
										<small>(Leave empty to use the current page)</small>
									</>
								)}
								parentPostId={attributes.parentPostId}
								onChange={(val) => {
									setAttributes({ parentPostId: val });
								}}
							/>

							{attributes.parentPostId && attributes.parentPostId !== currentPost.id && (
								<div>
									<p>If the <strong>current page</strong> is in the parent context's hierarchy:</p>
									<ToggleControl
										label="Include This Page's Children"
										checked={attributes.showCurrentChildren}
										onChange={(val) => setAttributes({ showCurrentChildren: val })}
									/>
								</div>
							)}

							<PanelRow>
								<RangeControl
									label="Maximum Depth of Children"
									allowReset
									resetFallbackValue={0}
									step={1}
									withInputField={false}
									marks={[
										{
											value: 0,
											label: 'All',
										},
										{
											value: 1,
											label: '1',
										},
										{
											value: 2,
											label: '2',
										},
										{
											value: 3,
											label: '3',
										},
										{
											value: 4,
											label: '4',
										},
										{
											value: 5,
											label: '5',
										},
										{
											value: 6,
											label: '6',
										},
									]}
									value={attributes.maxDepth}
									onChange={(val) => setAttributes({ maxDepth: val })}
									min={0}
									max={6}
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label="Exclude pages marked 'noindex' in popular SEO plugins."
									checked={attributes.excludeNoindex}
									onChange={(val) => setAttributes({ excludeNoindex: val })}
								/>
							</PanelRow>

							<PanelRow>
								<TextControl
									label="Exclude additional page IDs"
									help="Enter IDs, separated by a space or comma"
									value={attributes.excludeAdditionalIDs}
									onChange={(val) => setAttributes({ excludeAdditionalIDs: val})}
								/>
							</PanelRow>

						</PanelBody>

						<PanelBody title="Display Style">
							<PanelRow>
								<SelectControl
									label="Display Type"
									labelPosition="side"
									value={attributes.displayType}
									onChange={(val) => setAttributes({ displayType: val })}
									options={metadata.attributes.displayType.enum.map((opt) => {
										return { value: opt, label: opt.charAt(0).toUpperCase() + opt.slice(1) };
									})}
								/>
							</PanelRow>

							{attributes.displayType === 'custom' && (
								<PanelRow>
									<TextControl
										label="Custom Bullet"
										value={attributes.customBullet}
										onChange={(val) => setAttributes({ customBullet: val.substring(0, 1) })}
									/>
								</PanelRow>
							)}

							{attributes.displayType !== 'plain' && (
								<ColorPaletteControl
									label="Bullet Color"
									value={attributes.bulletColor}
									onChange={(val) => setAttributes({ bulletColor: val })}
								/>
							)}

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

							<ColorPaletteControl
								label="Link Color"
								value={attributes.linkColor}
								onChange={(val) => setAttributes({ linkColor: val })}
							/>
							<PanelRow>
								<ToggleControl
									label="Underline Links"
									checked={attributes.underlineLinks}
									onChange={(val) => setAttributes({ underlineLinks: val })}
								/>
							</PanelRow>

							<ColorPaletteControl
								label="Hover Link Color"
								value={attributes.linkColorHover}
								onChange={(val) => setAttributes({ linkColorHover: val })}
							/>
							<PanelRow>
								<ToggleControl
									label="Underline Links on Hover"
									checked={attributes.underlineOnHover}
									onChange={(val) => setAttributes({ underlineOnHover: val })}
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label="Highlight Current Page"
									checked={attributes.highlightCurrent}
									onChange={(val) => {
										setAttributes({ highlightCurrent: val });
									}}
								/>
							</PanelRow>

						</PanelBody>

						{attributes.highlightCurrent && (

							<PanelBody title="Current Page Highlight">

								<PanelRow>
									<UnitControl
										labelPosition="side"
										size="small"
										label="Font Size"
										onChange={(val) => setAttributes({ currentFontSize: val })}
										isUnitSelectTabbable
										unit="em"
										value={attributes.currentFontSize} />
								</PanelRow>

								<PanelRow>
									<SelectControl
										label="Font Weight"
										labelPosition="side"
										value={attributes.currentFontWeight}
										onChange={(val) => setAttributes({ currentFontWeight: val })}
										options={[
											{ value: null, label: 'Inherit' },
											{ value: 'normal', label: 'Normal' },
											{ value: 'bold', label: "Bold" }
										]}
									/>
								</PanelRow>

								<ColorPaletteControl
									label="Link Color"
									value={attributes.currentLinkColor}
									onChange={(val) => setAttributes({ currentLinkColor: val })}
								/>
								<PanelRow>
									<ToggleControl
										label="Underline Link"
										checked={attributes.currentUnderlineLinks}
										onChange={(val) => setAttributes({ currentUnderlineLinks: val })}
									/>
								</PanelRow>

								<ColorPaletteControl
									label="Hover Color"
									value={attributes.currentLinkColorHover}
									onChange={(val) => setAttributes({ currentLinkColorHover: val })}
								/>
								<PanelRow>
									<ToggleControl
										label="Underline Link on Hover"
										checked={attributes.currentUnderlineOnHover}
										onChange={(val) => setAttributes({ currentUnderlineOnHover: val })}
									/>
								</PanelRow>

							</PanelBody>
						)}

					</Panel>
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

				<Disabled>
					<ServerSideRender
						block={metadata.name}
						attributes={attributes}
						urlQueryArgs={{ post_id: currentPost.id }}
						LoadingResponsePlaceholder={MySpinner}
					/>
				</Disabled>
			</div>
		);
	},
} );