<?php
return
[
	'dependencies' => [
		'factories' => [
			'TableManagerMysql' => 'rollun\tableGateway\Factory\TableManagerMysqlFactory',
		],
		'abstract_factories' => [
			'rollun\tableGateway\Factory\TableGatewayAbstractFactory',
		],
	],
];