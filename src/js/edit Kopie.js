import { useState, useEffect, useRef } from "@wordpress/element";
import {
	SelectControl,
	PanelBody,
	CheckboxControl,
	Button,
	Popover,
	__experimentalInputControl as InputControl,
	Flex,
	FlexItem,
} from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { edit } from "@wordpress/icons";

import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { v4 as uuidv4 } from "uuid";

/* =============================================================== *\
   REST API Token aus globalem Scope holen
\* =============================================================== */
const REST_NONCE = window.udFilterTagBlockSettings?.nonce || "";

/* =============================== *
   Sortierbares Filterelement
* =============================== */
function SortableFilterItem({ filter, id, onRemove, onEdit, editButtonRef }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="filter-entry"
			{...attributes}
		>
			<Flex align="center" gap={2}>
				<FlexItem className="label_container" {...listeners}>
					<strong>{filter.label}</strong>
				</FlexItem>
				<FlexItem className="chip_container" {...listeners}>
					<span className="chip">{filter.tag}</span>
				</FlexItem>
				<FlexItem style={{ height: "20px" }}>
					<Button
						small
						variant="tertiary"
						aria-label={`Filter „${filter.label}“ bearbeiten`}
						title={`Filter „${filter.label}“ bearbeiten`}
						onClick={onEdit}
						ref={editButtonRef}
						style={{ padding: 0, height: "20px" }} // optional, falls zu viel Abstand
					>
						<span
							style={{
								width: "20px",
								height: "20px",
								display: "inline-block",
							}}
						>
							{edit}
						</span>
					</Button>
				</FlexItem>
			</Flex>
		</div>
	);
}

/* =============================== *
   Hauptkomponente
* =============================== */
export default function Edit({ attributes, setAttributes }) {
	const { filters = [], enabledTargets = [] } = attributes;
	const [availableTags, setAvailableTags] = useState([]);
	const [newLabel, setNewLabel] = useState("");
	const [newTag, setNewTag] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editLabel, setEditLabel] = useState("");
	const [editTag, setEditTag] = useState("");
	const editButtonRef = useRef();
	const blockProps = useBlockProps({ className: "filter-group-block" });
	const sensors = useSensors(useSensor(PointerSensor));
	const [isOpen, setIsOpen] = useState(false);

	const loadTags = () => {
		if (!REST_NONCE) return;
		fetch("/wp-json/ud-shared/v1/tags", {
			headers: {
				"Content-Type": "application/json",
				"X-WP-Nonce": REST_NONCE,
			},
		})
			.then((res) => res.json())
			.then((tags) => Array.isArray(tags) && setAvailableTags(tags))
			.catch(() => setAvailableTags([]));
	};

	function addFilter() {
		if (!newLabel.trim() || !newTag.trim()) return;
		const updated = [
			...filters,
			{ id: uuidv4(), label: newLabel, tag: newTag },
		];
		setAttributes({ filters: updated });
		setNewLabel("");
		setNewTag("");
	}

	function removeFilter(id) {
		const updated = filters.filter((item) => item.id !== id);
		setAttributes({ filters: updated });
	}

	function handleDragEnd(event) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = filters.findIndex((item) => item.id === active.id);
		const newIndex = filters.findIndex((item) => item.id === over.id);
		if (oldIndex !== -1 && newIndex !== -1) {
			setAttributes({ filters: arrayMove(filters, oldIndex, newIndex) });
		}
	}
	const [hasAccordion, setHasAccordion] = useState(false);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			const found = document.querySelector(
				".wp-block-ud-accordion-block",
			);
			setHasAccordion(!!found);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Initialprüfung
		setHasAccordion(
			!!document.querySelector(".wp-block-ud-accordion-block"),
		);

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div {...blockProps}>
				<div className="filter-list">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext items={filters.map((f) => f.id)}>
							{filters.map((filter) => (
								<SortableFilterItem
									key={filter.id}
									id={filter.id}
									filter={filter}
									onRemove={removeFilter}
									onEdit={() => {
										loadTags(); // ← sorgt dafür, dass die Tag-Optionen geladen werden
										setEditLabel(filter.label);
										setEditTag(filter.tag);
										setEditingId(filter.id);
									}}
									editButtonRef={editButtonRef}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>

				{/* Filter hinzufügen UI */}
				<div className="add-filter-area">
					<Button
						style={{ borderRadius: "100px" }}
						variant="secondary"
						onClick={() => {
							loadTags();
							setIsOpen((prev) => !prev);
						}}
					>
						<svg
							style={{ width: "12px" }}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
						>
							<path d="M256 80l0-32-64 0 0 32 0 144L48 224l-32 0 0 64 32 0 144 0 0 144 0 32 64 0 0-32 0-144 144 0 32 0 0-64-32 0-144 0 0-144z" />
						</svg>
					</Button>
					{isOpen && (
						<Popover
							position="bottom center"
							onClose={() => setIsOpen(false)}
							className="filter-group-block_popover"
						>
							<h3 style={{ marginTop: "0px" }}>
								Filter hinzufügen
							</h3>
							<div className="input_fields">
								<InputControl
									label="Anzeigetext"
									value={newLabel}
									onChange={(val) => setNewLabel(val)}
								/>
								<SelectControl
									label="Filter-Tag"
									value={newTag}
									onChange={(val) => setNewTag(val)}
									options={[
										{ label: "Bitte wählen", value: "" },
										...availableTags.map((t) => ({
											label: t,
											value: t,
										})),
									]}
								/>
							</div>
							<Button
								variant="primary"
								onClick={() => {
									addFilter();
									setIsOpen(false);
								}}
								style={{ marginTop: "1rem" }}
							>
								Hinzufügen
							</Button>
						</Popover>
					)}
				</div>
<InnerBlocks
	template={[
		['core/group', { className: 'is-style-filter-container' }]
	]}
	templateLock={false}
/>


			</div>

			{/* Bearbeiten-Popover */}
			{editingId && (
				<Popover
					anchor={editButtonRef.current}
					position="bottom center"
					onClose={() => setEditingId(null)}
					className="filter-group-block_popover"
				>
					<h3 style={{ marginTop: "0px" }}>Filter bearbeiten</h3>
					<div className="input_fields">
						<InputControl
							label="Anzeigetext"
							value={editLabel}
							onChange={setEditLabel}
						/>
						<SelectControl
							label="Filter-Tag"
							value={editTag}
							onChange={setEditTag}
							options={[
								{ label: "Bitte wählen", value: "" },
								...availableTags.map((t) => ({
									label: t,
									value: t,
								})),
							]}
						/>
					</div>
					<Flex justify="space-between" style={{ marginTop: "1rem" }}>
						<Button
							variant="tertiary"
							onClick={() => {
								removeFilter(editingId);
								setEditingId(null);
							}}
						>
							Entfernen
						</Button>
						<Button
							variant="primary"
							disabled={!editLabel.trim() || !editTag.trim()}
							onClick={() => {
								const updated = filters.map((f) =>
									f.id === editingId
										? {
												...f,
												label: editLabel,
												tag: editTag,
										  }
										: f,
								);
								setAttributes({ filters: updated });
								setEditingId(null);
							}}
						>
							Änderungen speichern
						</Button>
					</Flex>
				</Popover>
			)}


		</>
	);
}
