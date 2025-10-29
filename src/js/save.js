import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

function slugify(text) {
	return text
		.toString()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/ä/g, "ae")
		.replace(/ö/g, "oe")
		.replace(/ü/g, "ue")
		.replace(/ß/g, "ss")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export default function save({ attributes }) {
	const { filters = [] } = attributes;
	const blockProps = useBlockProps.save({
		className: "filter-button-group",
		"data-filter-target": ".is-style-filter-container > *",
	});

	return (
		<div {...blockProps}>
			{filters.map((filter, index) => {
				const slug = slugify(filter.tag);
				return (
					<button
						key={index}
						type="button"
						data-filter={slug}
						className="filter-tag-button"
					>
						{filter.label || "Filter"}
					</button>
				);
			})}
		</div>
	);
}
