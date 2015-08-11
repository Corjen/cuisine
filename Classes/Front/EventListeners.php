<?php

	namespace Cuisine\Front;

	use \Cuisine\Utilities\Url;
	use \Cuisine\Wrappers\StaticInstance;

	class EventListeners extends StaticInstance{

		/**
		 * Init admin events & vars
		 */
		function __construct(){

			$this->listen();


		}

		/**
		 * Listen for WordPress Hooks
		 * 
		 * @return void
		 */
		private function listen(){


			//Add filters for current nav items:
			add_filter( 'nav_menu_css_class', function( $classes, $item ){

				global $Cuisine;

				foreach( $Cuisine->navItems as $name => $args ){

					if( strtolower( $name ) == strtolower( $item->title ) ){
			
						$addClass = false;
			
						if( $args['type'] == 'single' || $args['type'] == 'overview' ){
			
							//check the post-type
							if( get_post_type() == $args['query'] )
								$addClass = true;
			
						}else if( $args['type'] == 'page' && is_page() ){
			
							//check the page
							if( is_page( $args['query'] ) )
								$addClass = true;
			
						}
			
			
						//add the class
						if( $addClass )
							$classes[] = 'current-menu-item';
			
					}

				}

				return $classes;


			}, 100, 2 );


		}





	}

	\Cuisine\Front\EventListeners::getInstance();