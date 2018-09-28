<?php
/**
 * Created by PhpStorm.
 * User: USER_T
 * Date: 27.09.2018
 * Time: 16:25
 */

use rollun\datastore\DataStore\CsvBase;
use rollun\datastore\DataStore\DbTable;
use rollun\datastore\DataStore\Factory\CsvAbstractFactory;
use rollun\datastore\DataStore\Factory\DataStoreAbstractFactory;
use rollun\datastore\DataStore\Factory\DbTableAbstractFactory;
use rollun\installer\Command;
use rollun\tableGateway\Factory\TableGatewayAbstractFactory;

return [
    TableGatewayAbstractFactory::KEY => [
        'rql_compatability_test_data' => []
    ],
    DataStoreAbstractFactory::KEY_DATASTORE => [
        'test-datastore-csv' => [
            'class' => CsvBase::class,
            CsvAbstractFactory::KEY_FILENAME => Command::getDataDir() . 'testData.csv',
            CsvAbstractFactory::KEY_DELIMITER => ',',
        ],
        'test-datastore-db' => [
            DbTableAbstractFactory::KEY_CLASS => DbTable::class,
            DbTableAbstractFactory::KEY_TABLE_GATEWAY => 'rql_compatability_test_data'
        ],
    ]
];