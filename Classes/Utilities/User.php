<?php
namespace Cuisine\Utilities;

use WP_User;

class User extends WP_User {
    /**
     * Check if the user has role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole( $role ) {

        $user = wp_get_current_user();

        return in_array( $role, $user->roles );
    }

    /**
     * Set User role.
     *
     * @param string $role
     * @return \Cuisine\User\User
     */
    public function setRole( $role ) {
        $user = wp_get_current_user();
        $user->set_role($role);
        return $this;
    }

    /**
     * Check if the user can do a defined capability.
     *
     * @param string $cap
     * @return bool
     */
    public function can( $cap ) {

        $user = wp_get_current_user();
        return current_user_can( $cap );
    
    }

    /**
     * Update the user properties.
     *
     * @param array $userdata
     * @return \Cuisine\User\User|\WP_Error
     */
    public function update(array $userdata) {
        $user = wp_get_current_user();    
        $userdata = array_merge( $userdata, array( 'ID' => $user->ID ) );

        $user = wp_update_user($userdata);

        if(is_wp_error($user)) return $user;

        return $this;
    }

} 