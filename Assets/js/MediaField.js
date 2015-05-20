/**
 * Main MediaField JS Class
 *
 * Takes care of the javascripts functions in the Field engine.
 *
 * @since Cuisine 1.4
 */


 	var MediaField = Backbone.View.extend({
	
		items: {},
		id: '',
		highestId: '',
		container: '',


		events: {

			'click #media-add' : 'launchMediaLibrary',
			'click .remove-btn' : 'removeMediaItem',
		},
 	
 		initialize: function(){

 			var self = this;
 			self.id = self.$el.data('id');
 			self.highestId = parseInt( self.$el.data( 'highest-id' ) );
 			
 			self.container = self.$el.find( '.media-inner' );
 			self.setItems();
 			self.setItemEvents();
 			self.setItemPositions();

 		},

 		/**
 		 * Set the items object for this field:
 		 *
 		 * @return void
 		 */
 		setItems: function(){
 			
 			var self = this;
 			self.items = self.$el.find( '.media-item' );

 			if( self.items.length > 0 ){
 				self.$el.find('.no-media').hide();
 			}else{
 				self.$el.find('.no-media').show();
 			}
 		
 		},

 		/**
 		 * Sets the sorting and deleting events for this mediafield
 		 *
 		 * @return void
 		 */
 		setItemEvents: function(){
 			
 			var self = this;

 			jQuery( self.container ).sortable({
 				placeholder: 'media-placeholder',
 				update: function (event, ui) {

 					self.setItems();
 					self.setItemPositions();

 				}
 			});
 		},

 		/**
 		 * Set item positions:
 		 *
 		 * @return void
 		 */
 		setItemPositions: function(){

 			var self = this;

 			for( var i = 0; i < self.items.length; i++ ){

 				var item = jQuery( self.items[ i ] );

 				//set the position:
 				item.find( '#position' ).val( i );
 				console.log( 'position: '+item.find('#img-id').val()+' -> '+ i );
 			}

 		},


 		/**
 		 * Remove a media item:
 		 * 
 		 * @return void
 		 */
 		removeMediaItem: function( ev ){
 			ev.preventDefault();
 			var self = this;

 			if( confirm( "Weet je zeker dat je deze afbeelding wil verwijderen?" ) ){
 				jQuery( ev.target ).parent().parent().remove();

 				//set the new items object
 				self.setItems();
 					
 				//re-init events:
 				self.setItemEvents();

 				//set positions correctly:
 				self.setItemPositions();	
 			}
 		},

 		/**
 		 * Show a media lightbox
 		 * 
 		 * @return void
 		 */
 		launchMediaLibrary: function( evt ){

 			evt.preventDefault();
 			
 			var self = this;

 			var options = {
 				title:'Uploaden',
 				button:'Opslaan',
 				//media_type:'image',
 				multiple:true,
 				self: self,	
 			}


 			var properties = {};
 			var fullId = self.fullId;
 			var _position = 200;

 			Media.uploader( options, function( attachments, options ){
 				
 				for( var i = 0; i < attachments.length; i++ ){

 					var attachment = attachments[ i ];


 					var htmlTemplate = _.template( jQuery( '#media_item_template').html() );
 					var output = htmlTemplate({
 						item_id: self.getHighestId(),
 						preview_url: attachment.sizes.thumbnail.url,
 						img_id: attachment.id,
 						position: _position,
 					});


 					//jQuery( self.container ).append( output );
 					self.$el.find('.media-inner').append( output );

 					_position++;
 				}

 				//set the new items object
 				self.setItems();
 					
 				//re-init events:
 				self.setItemEvents();

 				//set positions correctly:
 				self.setItemPositions();

 			});
 		},

 		/**
 		 * Gets the highest ID and upps it by one
 		 * 
 		 * @return void:
 		 */
 		getHighestId: function(){

 			var self = this;

 			self.highestId = parseInt( self.highestId ) + 1;
 			return self.highestId;

 		},

	
 	});



 	jQuery( document ).ready( function(){

 		cuisineInitMediaFields();

 	});

 	function cuisineInitMediaFields(){
 		jQuery('.media-grid' ).each( function( index, obj ){
 			var mf = new MediaField( { el: obj } );
 		});
 	}