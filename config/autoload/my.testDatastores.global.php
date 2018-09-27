<?php
/**
 * Created by PhpStorm.
 * User: USER_T
 * Date: 27.09.2018
 * Time: 16:25
 */

use rollun\datastore\DataStore\CsvBase;
use rollun\datastore\DataStore\Factory\CsvAbstractFactory;
use rollun\datastore\DataStore\Factory\DataStoreAbstractFactory;
use rollun\installer\Command;

return [
    DataStoreAbstractFactory::KEY_DATASTORE => [
        'test-datastore-csv' => [
            'class' => CsvBase::class,
            CsvAbstractFactory::KEY_FILENAME => Command::getDataDir() . 'testData.csv',
            CsvAbstractFactory::KEY_DELIMITER => ',',
        ],
    ]
];