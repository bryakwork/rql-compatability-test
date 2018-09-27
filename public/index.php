<?php

// Delegate static file requests back to the PHP built-in webserver
use rollun\logger\LifeCycleToken;

if (PHP_SAPI === 'cli-server' && $_SERVER['SCRIPT_FILENAME'] !== __FILE__) {
    return false;
}

chdir(dirname(__DIR__));
require 'vendor/autoload.php';
require_once 'config/env_configurator.php';

/**
 * Self-called anonymous function that creates its own scope and keep the global namespace clean.
 */
call_user_func(function () {
    /** @var \Psr\Container\ContainerInterface $container */
    $container = require 'config/container.php';
    \rollun\dic\InsideConstruct::setContainer($container);
    //inject token to container
    $lifeCycleToke = LifeCycleToken::generateToken();
    if(getallheaders() && array_key_exists("LifeCycleToken", getallheaders())) {
        $lifeCycleToke->unserialize(getallheaders()["LifeCycleToken"]);
    }
    $container->setService(LifeCycleToken::class, $lifeCycleToke);
    /** @var \Zend\Expressive\Application $app */
    $app = $container->get(\Zend\Expressive\Application::class);

    // Import programmatic/declarative middleware pipeline and routing
    // configuration statements
    require 'config/pipeline.php';
    require 'config/routes.php';

    $app->run();
});
