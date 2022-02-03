<?php

use MaltKit\Mk;

function mkSiteConfig() {

  return [

    'defaultRoute' => 'mk.home',

    // MODS

    'mods' => [

      // Example
//      'example' => [
//        'namespace' => 'MaltKit',
//        'class' => 'Example',
//      ], // example

      // Mk
      'mk' => [
        'namespace' => 'MaltKit',
        'class' => 'Mk',
      ], // mk

      // MkDocs
      'mkDocs' => [
        'namespace' => 'MaltKit',
        'class' => 'MkDocs',
      ], // mkDocs

      // MkGames
      'mkGames' => [
        'namespace' => 'MaltKit',
        'class' => 'MkGames',
      ], // mkGames

    ], // mods

    // THEMES

    'themes' => [

      // Boots Theme - A Bootstrap 5 Theme
      'boots' => [
        'namespace' => 'MaltKit',
        'class' => 'Boots',
      ],

    ], // themes

    // CURRENT THEME

    'theme' => 'boots',

  ];

}
