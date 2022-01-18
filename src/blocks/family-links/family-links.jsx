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
const ServerSideRender = wp.serverSideRender;
const {
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
} = wp.components;
const {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	ColorPaletteControl,
	InspectorControls,
} = wp.blockEditor;
const { useSelect } = wp.data;

registerBlockType( metadata.name, {
	...metadata,

	edit: (props) => {
		const { attributes, setAttributes } = props;
		const blockProps = useBlockProps();
		const currentPost = wp.data.select('core/editor').getCurrentPost();
		const currentPostParentId = wp.data.select('core/editor').getEditedPostAttribute('parent');

		if (attributes.parentPostId === null) {
			if (attributes.showSiblings) {
				attributes.parentPostId = currentPostParentId;
			} else {
				attributes.parentPostId = currentPost.id;
			}
		}

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

		return (
			<div {...blockProps}>
				<InspectorControls>
					<Panel>
						<PanelBody title="Query Control">

							<p>Select the page to draw children from:</p>

							<PageSelector
								label="Parent Context"
								parentPostId={attributes.parentPostId}
								onChange={(val) => {
									setAttributes({ parentPostId: val });
								}}
							/>

							{attributes.parentPostId && (
								<>
									<p>If the current page is in the parent context's hierarchy:</p>
									<ToggleControl
										label="Include This Page's Children"
										checked={attributes.showChildren}
										onChange={(val) => setAttributes({ showChildren: val })}
									/>
								</>
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
									value={attributes.depth}
									onChange={(val) => setAttributes({ depth: val })}
									min={0}
									max={6}
								/>
							</PanelRow>

						</PanelBody>

						<PanelBody title="Display Style">
							<Flex align="top">
								<FlexItem style={{ width: '50%' }}>
									<SelectControl
										label="Display Type"
										value={attributes.displayType}
										onChange={(val) => setAttributes({ displayType: val })}
										options={[
											{ value: 'plain', label: 'Plain' },
											{ value: 'bullets', label: 'Bulleted' },
											{ value: 'numbered', label: 'Numbered' },
										]}
									/>
								</FlexItem>
								<FlexItem style={{ width: '50%' }}>
									<UnitControl
										label="Child Indentation"
										onChange={(val) => setAttributes({ childIndent: val })}
										isUnitSelectTabbable
										value={attributes.childIndent} />
								</FlexItem>
							</Flex>

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

						</PanelBody>

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

				<ServerSideRender
					block={metadata.name}
					attributes={attributes}
					urlQueryArgs={{ post_id: currentPost.id }}
				/>
			</div>
		);
	},
} );