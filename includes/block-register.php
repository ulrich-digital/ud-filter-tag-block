<?php
defined('ABSPATH') || exit;

function ud_register_filter_tag_block() {
    register_block_type(__DIR__ . '/../block.json');
}
add_action('init', 'ud_register_filter_tag_block');


register_block_style(
	'core/group',
	[
		'name'  => 'filterable-group',
		'label' => 'Filterbar',
	]
);
