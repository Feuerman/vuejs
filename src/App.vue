<template>
    <div id="app">
        <b-navbar toggleable fixed="top" type="inverse" variant="primary">
            <div class="container">
                <b-nav-toggle target="nav_collapse"></b-nav-toggle>

                <b-link class="navbar-brand" to="/">
                    <span>Vue</span>
                </b-link>

                <b-collapse is-nav id="nav_collapse">

                    <b-nav is-nav-bar>
                        <b-nav-item  to="/news">Новости</b-nav-item>
                        <b-nav-item to="/weather">Погода</b-nav-item>
                        <b-nav-item to="/comments">Комментарии</b-nav-item>
                        <b-nav-item to="/google-map">Карта</b-nav-item>
                        <b-nav-item to="/gallery">Галерея</b-nav-item>
                    </b-nav>

                    <b-nav is-nav-bar class="ml-auto">

                        <!-- Navbar dropdowns -->
                        <b-nav-item-dropdown text="Lang" right>
                            <b-dropdown-item to="#">EN</b-dropdown-item>
                            <b-dropdown-item to="#">ES</b-dropdown-item>
                            <b-dropdown-item to="#">RU</b-dropdown-item>
                            <b-dropdown-item to="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown right>

                            <!-- Using text slot -->
                            <template slot="text">
                                <span style="font-weight: bold;">User</span>
                            </template>

                        </b-nav-item-dropdown>

                    </b-nav>
                </b-collapse>
            </div>
        </b-navbar>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>
<script>
</script>

<style src="./app.scss" lang="scss"></style>