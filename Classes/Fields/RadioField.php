<?php
namespace Cuisine\Fields;


class RadioField extends DefaultField{


    /**
     * Method to override to define the input type
     * that handles the value.
     *
     * @return void
     */
    protected function fieldType(){
        $this->type = 'radio';
    }

  

    /**
     * Build the html
     *
     * @return String;
     */
    public function build(){

        $choices = $this->getChoices();


        return $html;
    }




}