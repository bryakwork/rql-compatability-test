<?php
return
[
	'dependencies' => [
		'factories' => [
			'TableManagerMysql' => 'rollun\datastore\TableGateway\Factory\TableManagerMysqlFactory',
		],
		'abstract_factories' => [
			'rollun\datastore\DataStore\Factory\DbTableAbstractFactory',
			'rollun\datastore\TableGateway\Factory\TableGatewayAbstractFactory',
		],
	],
];