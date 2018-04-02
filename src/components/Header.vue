<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <router-link to="/" class="navbar-brand"><a>Home</a></router-link>
                </div>

                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <router-link to="/income" tag="li" active-class="active"><a>Income</a></router-link>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>