<?php
return
[
	'dependencies' => [
		'factories' => [
			'rollun\datastore\Middleware\ResourceResolver' => 'Zend\ServiceManager\Factory\InvokableFactory',
			'rollun\datastore\Middleware\RequestDecoder' => 'Zend\ServiceManager\Factory\InvokableFactory',
			'rollun\datastore\Middleware\HtmlDataPrepare' => 'Zend\ServiceManager\Factory\InvokableFactory',
		],
		'abstract_factories' => [
			'rollun\datastore\Middleware\Factory\ImplicitDataStoreMiddlewareAbstractFactory',
		],
	],
	'rollun\actionrender\MiddlewareDeterminator\Factory\AbstractMiddlewareDeterminatorAbstractFactory' => [
		'dataStoreHtmlJsonRenderer' => [
			'class' => 'rollun\actionrender\MiddlewareDeterminator\HeaderSwitch',
			'name' => 'Accept',
			'middlewareMatching' => [
				'/application\/json/' => 'rollun\actionrender\Renderer\Json\JsonRenderer',
				'/text\/html/' => 'dataStoreHtmlRenderer',
			],
		],
		'rollun\datastore\DataStoreMiddlewareDeterminator' => [
			'class' => 'rollun\datastore\DataStoreMiddlewareDeterminator',
			'name' => 'resourceName',
		],
	],
	'rollun\actionrender\Factory\LazyLoadMiddlewareAbstractFactory' => [
		'dataStoreLLPipe' => [
			'middlewareDeterminator' => 'rollun\datastore\DataStoreMiddlewareDeterminator',
			'middlewarePluginManager' => 'rollun\actionrender\MiddlewarePluginManager',
		],
		'dataStoreHtmlJsonRendererLLPipe' => [
			'middlewareDeterminator' => 'dataStoreHtmlJsonRenderer',
			'middlewarePluginManager' => 'rollun\actionrender\MiddlewarePluginManager',
		],
	],
	'rollun\actionrender\Factory\ActionRenderAbstractFactory' => [
		'api-datastore' => [
			'action_middleware_service' => 'apiDataStoreAction',
			'render_middleware_service' => 'dataStoreHtmlJsonRendererLLPipe',
		],
	],
	'rollun\actionrender\Factory\MiddlewarePipeAbstractFactory' => [
		'apiDataStoreAction' => [
			'middlewares' => [
				'rollun\datastore\Middleware\ResourceResolver',
				'rollun\datastore\Middleware\RequestDecoder',
				'dataStoreLLPipe',
			],
		],
		'dataStoreHtmlRenderer' => [
			'middlewares' => [
				'rollun\actionrender\Renderer\Html\HtmlParamResolver',
				'rollun\datastore\Middleware\HtmlDataPrepare',
				'rollun\actionrender\Renderer\Html\HtmlRenderer',
			],
		],
	],
	'routes' => [
		[
			'name' => 'api-datastore',
			'path' => '/api/datastore[/{resourceName}[/{id}]]',
			'middleware' => 'api-datastore',
			'allowed_methods' => [
				'GET',
				'POST',
				'PUT',
				'DELETE',
				'PATCH',
			],
		],
	],
];