<?php
return
[
	'dependencies' => [
		'invokables' => [
			'rollun\actionrender\Renderer\Html\HtmlParamResolver' => 'rollun\actionrender\Renderer\Html\HtmlParamResolver',
			'rollun\actionrender\Renderer\Json\JsonRenderer' => 'rollun\actionrender\Renderer\Json\JsonRenderer',
			'rollun\actionrender\ReturnMiddleware' => 'rollun\actionrender\ReturnMiddleware',
		],
		'factories' => [
			'rollun\actionrender\Renderer\Html\HtmlRenderer' => 'rollun\actionrender\Renderer\Html\Factory\HtmlRendererFactory',
		],
	],
	'rollun\actionrender\Factory\MiddlewarePipeAbstractFactory' => [
		'htmlReturner' => [
			'middlewares' => [
				'rollun\actionrender\Renderer\Html\HtmlParamResolver',
				'rollun\actionrender\Renderer\Html\HtmlRenderer',
			],
		],
	],
	'rollun\actionrender\MiddlewareDeterminator\Factory\AbstractMiddlewareDeterminatorAbstractFactory' => [
		'simpleHtmlJsonRenderer' => [
			'class' => 'rollun\actionrender\MiddlewareDeterminator\HeaderSwitch',
			'name' => 'Accept',
			'middlewareMatching' => [
				'/application\/json/' => 'rollun\actionrender\Renderer\Json\JsonRenderer',
				'/text\/html/' => 'htmlReturner',
			],
		],
	],
	'rollun\actionrender\Factory\LazyLoadMiddlewareAbstractFactory' => [
		'simpleHtmlJsonRendererLLPipe' => [
			'middlewarePluginManager' => 'rollun\actionrender\MiddlewarePluginManager',
			'middlewareDeterminator' => 'simpleHtmlJsonRenderer',
		],
	],
];