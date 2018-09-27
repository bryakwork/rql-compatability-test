<?php
return
[
	'dependencies' => [
		'abstract_factories' => [
			'rollun\actionrender\Factory\ActionRenderAbstractFactory',
		],
		'invokables' => [
			'rollun\actionrender\ReturnMiddleware' => 'rollun\actionrender\ReturnMiddleware',
		],
	],
];