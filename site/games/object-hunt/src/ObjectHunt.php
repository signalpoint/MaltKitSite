<?php

namespace MaltKit;

use MaltKit\Game;

class ObjectHunt extends Game {

  public function __construct($id, $game) {
    $this->name = 'ObjectHunt';
    $this->version = '0.0.0';
    $this->slogan = 'Learn Objects in Another Language';
    $this->description = 'Hunt for objects and their matching translation.';
    $this->page = [
      'head' => [
        'scripts' => [
          'main.js',
          'brain.js',
          'classes/card.js',
        ],
      ],
    ];
    parent::__construct($id, $game);
  }

  public function rest() {

    return [

        'objects' => [
          'get' => [],
        ],

        'sound' => [
          'get' => [
            'header' => [
              'Content-Type' => 'audio/mpeg'
            ],
          ],
        ],

      ];

  }

  public function api($resource, $method, $data = NULL) {

    switch ($resource) {

      case 'objects':

        if ($method == 'get') {

          $language = 'vi';

          return [
            'icons' => $this->icons(),
            'words' => $this->words($language),
          ];

        }

        break;

      case 'sound':

        // * @param type $languageCode {String} The language code you want to translate to.
        // * @param type $number {String} The native number you want translated.
        if ($method == 'get') {

          $languageCode = mkArg(3);
          $word = mkArg(4);

          $words = $this->api('objects', 'get')['words'];

          $urlEncodedWord = urlencode($words[$word]);

          $url = "https://translate.google.com.vn/translate_tts?ie=UTF-8&q={$urlEncodedWord}&tl={$languageCode}&client=tw-ob";

          return file_get_contents($url, false, stream_context_create([
            'http' => [
              'ignore_errors' => true,
              'header' => "Content-Type: audio/mpeg;",
            ]
          ]));

        }

        break;

    }

  }

  /**
 * A map of English words (objects) to their respective Font Awesome 5 icon. An
 * icon value of 0 means the word maps cleanly to the icon name.
 * @return array
 */
  public function icons() {
    return [
      'ambulance' => 0,
      'anchor' => 0,
      'baby' => 0,
      'bacon' => 0,
      'bacteria' => 0,
      'band-aid' => 0,
      'barcode' => 0,
      'baseball' => 'baseball-ball',
      'basketball' => 'basketball-ball',
      'bath' => 0,
      'battery' => 'battery-full',
      'bed' => 0,
      'bicycle' => 0,
      'binoculars' => 0,
      'blender' => 0,
      'bomb' => 0,
      'bone' => 0,
      'book' => 0,
      'bowling ball' => 'bowling-ball',
      'box' => 0,
      'brain' => 0,
      'bread' => 'bread-slice',
      'broom' => 0,
      'brush' => 0,
      'bug' => 0,
      'building' => 0,
      'bullseye' => 0,
      'bus' => 0,
      'cake' => 'birthday-cake',
      'calculator' => 0,
      'calendar' => 'calendar-alt',
      'camera' => 0,
      'campground' => 0,
      'car' => 0,
      'carrot' => 0,
      'cash register' => 'cash-register',
      'cat' => 0,
      'chair' => 0,
      'charging station' => 'charging-station',
      'cheese' => 0,
      'chess' => 0,
      'bishop' => 'chess-bishop',
      'king' => 'chess-king',
      'knight' => 'chess-knight',
      'pawn' => 'chess-pawn',
      'queen' => 'chess-queen',
      'rook' => 'chess-rook',
      'child' => 0,
      'church' => 0,
      'city' => 0,
      'clock' => 0,
      'cloud' => 0,
      'rain' => 'cloud-rain',
      'coffee' => 0,
      'compass' => 0,
      'bell' => 'concierge-bell',
      'cookie' => 0,
      'couch' => 0,
      'crosshairs' => 0,
      'crow' => 0,
      'crown' => 0,
      'crutch' => 0,
      'cube' => 0,
      'dice' => 0,
      'dog' => 0,
      'dove' => 0,
      'dragon' => 0,
      'drum' => 0,
      'dumbbell' => 0,
      'dumpster' => 0,
      'egg' => 0,
      'ellipsis' => 'ellipsis-h',
      'envelope' => 0,
      'equals' => 0,
      'eraser' => 0,
      'exclamation point' => 'exclamation',
      'eye' => 0,
    ];
  }

  public function words($language) {
    $dictionary = [
      'ambulance' => [
        'es' => '',
        'vi' => 'xe c???u th????ng',
      ],
      'anchor' => [
        'es' => '',
        'vi' => 'm??? neo',
      ],
      'baby' => [
        'es' => '',
        'vi' => '?????a b??',
      ],
      'bacon' => [
        'es' => '',
        'vi' => 'Th???t ba r???i',
      ],
      'bacteria' => [
        'es' => '',
        'vi' => 'vi khu???n',
      ],
      'band-aid' => [
        'es' => '',
        'vi' => 'b??ng c?? nh??n',
      ],
      'barcode' => [
        'es' => '',
        'vi' => 'm?? v???ch',
      ],
      'baseball' => [
        'es' => '',
        'vi' => 'b??ng ch??y',
      ],
      'basketball' => [
        'es' => '',
        'vi' => 'b??ng r???',
      ],
      'bath' => [
        'es' => '',
        'vi' => 'b???n t???m',
      ],
      'battery' => [
        'es' => '',
        'vi' => 'pin',
      ],
      'bed' => [
        'es' => '',
        'vi' => 'Gi?????ng',
      ],
      'bicycle' => [
        'es' => '',
        'vi' => 'Xe ?????p',
      ],
      'binoculars' => [
        'es' => '',
        'vi' => '???ng nh??m',
      ],
      'blender' => [
        'es' => '',
        'vi' => 'm??y xay',
      ],
      'bomb' => [
        'es' => '',
        'vi' => 'bom',
      ],
      'bone' => [
        'es' => '',
        'vi' => 'kh??c x????ng',
      ],
      'book' => [
        'es' => '',
        'vi' => 's??ch',
      ],
      'bowling ball' => [
        'es' => '',
        'vi' => 'b??ng bowling',
      ],
      'box' => [
        'es' => '',
        'vi' => 'h???p',
      ],
      'brain' => [
        'es' => '',
        'vi' => '??c',
      ],
      'bread' => [
        'es' => '',
        'vi' => 'b??nh m???',
      ],
      'broom' => [
        'es' => '',
        'vi' => 'ch???i',
      ],
      'brush' => [
        'es' => '',
        'vi' => 'ch???i',
      ],
      'bug' => [
        'es' => '',
        'vi' => 's??u b???',
      ],
      'building' => [
        'es' => '',
        'vi' => 'T??a nh??',
      ],
      'bullseye' => [
        'es' => '',
        'vi' => 'm???t b??',
      ],
      'bus' => [
        'es' => '',
        'vi' => 'xe bu??t',
      ],
      'cake' => [
        'es' => '',
        'vi' => 'b??nh ng???t',
      ],
      'calculator' => [
        'es' => '',
        'vi' => 'm??y t??nh',
      ],
      'calendar' => [
        'es' => '',
        'vi' => 'l???ch',
      ],
      'camera' => [
        'es' => '',
        'vi' => 'M??y ???nh',
      ],
      'campground' => [
        'es' => '',
        'vi' => 'khu c???m tr???i',
      ],
      'car' => [
        'es' => '',
        'vi' => 'xe ?? t??',
      ],
      'carrot' => [
        'es' => '',
        'vi' => 'c??? c?? r???t',
      ],
      'cash register' => [
        'es' => '',
        'vi' => 'm??y t??nh ti???n',
      ],
      'cat' => [
        'es' => '',
        'vi' => 'con m??o',
      ],
      'chair' => [
        'es' => '',
        'vi' => 'c??i gh???',
      ],
      'charging station' => [
        'es' => '',
        'vi' => 'tr???m s???c',
      ],
      'cheese' => [
        'es' => '',
        'vi' => 'ph?? mai',
      ],
      'chess' => [
        'es' => '',
        'vi' => 'c??? vua',
      ],
      'bishop' => [
        'es' => '',
        'vi' => 'gi??m m???c',
      ],
      'king' => [
        'es' => '',
        'vi' => 'nh?? vua',
      ],
      'knight' => [
        'es' => '',
        'vi' => 'Hi???p s???',
      ],
      'pawn' => [
        'es' => '',
        'vi' => 'c???m ?????',
      ],
      'queen' => [
        'es' => '',
        'vi' => 'n??? ho??ng',
      ],
      'rook' => [
        'es' => '',
        'vi' => 'rook',
      ],
      'child' => [
        'es' => '',
        'vi' => '?????a tr???',
      ],
      'church' => [
        'es' => '',
        'vi' => 'Nh?? th???',
      ],
      'city' => [
        'es' => '',
        'vi' => 'th??nh ph???',
      ],
      'clock' => [
        'es' => '',
        'vi' => 'c??i ?????ng h???',
      ],
      'cloud' => [
        'es' => '',
        'vi' => '????m m??y',
      ],
      'rain' => [
        'es' => '',
        'vi' => 'c??n m??a',
      ],
      'coffee' => [
        'es' => '',
        'vi' => 'c?? ph??',
      ],
      'compass' => [
        'es' => '',
        'vi' => 'ph???m vi',
      ],
      'bell' => [
        'es' => '',
        'vi' => 'chu??ng',
      ],
      'cookie' => [
        'es' => '',
        'vi' => 'b??nh quy',
      ],
      'couch' => [
        'es' => '',
        'vi' => '??i v??ng',
      ],
      'crosshairs' => [
        'es' => '',
        'vi' => 'gh??? ch??o',
      ],
      'crow' => [
        'es' => '',
        'vi' => 'con qu???',
      ],
      'crown' => [
        'es' => '',
        'vi' => 'V????ng mi???n',
      ],
      'crutch' => [
        'es' => '',
        'vi' => 'c??i n???ng',
      ],
      'cube' => [
        'es' => '',
        'vi' => 'kh???i l???p ph????ng',
      ],
      'dice' => [
        'es' => '',
        'vi' => 'x??c x???c',
      ],
      'dog' => [
        'es' => '',
        'vi' => 'ch?? ch??',
      ],
      'dove' => [
        'es' => '',
        'vi' => 'chim b??? c??u',
      ],
      'dragon' => [
        'es' => '',
        'vi' => 'r???ng',
      ],
      'drum' => [
        'es' => '',
        'vi' => 'c??i tr???ng',
      ],
      'dumbbell' => [
        'es' => '',
        'vi' => 'chu??ng h??',
      ],
      'dumpster' => [
        'es' => '',
        'vi' => 'b??i r??c',
      ],
      'egg' => [
        'es' => '',
        'vi' => 'tr???ng',
      ],
      'ellipsis' => [
        'es' => '',
        'vi' => 'd???u ch???m l???ng',
      ],
      'envelope' => [
        'es' => '',
        'vi' => 'phong b??',
      ],
      'equals' => [
        'es' => '',
        'vi' => 'b???ng',
      ],
      'eraser' => [
        'es' => '',
        'vi' => 'c???c g??m',
      ],
      'exclamation point' => [
        'es' => '',
        'vi' => 'd???u ch???m than',
      ],
      'eye' => [
        'es' => '',
        'vi' => 'con m???t',
      ],
    ];
    $words = [];
    foreach ($dictionary as $word => $translations) {
      $words[$word] = $translations[$language] != '' ?
        $translations[$language] : NULL;
    }
    return $words;
  }

}
