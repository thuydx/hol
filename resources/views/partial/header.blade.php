<header class="header header-sticky p-0 mb-4">
    <div class="container-fluid border-bottom px-4">
        <button class="header-toggler" type="button" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()" style="margin-inline-start: -14px;">
            <svg class="icon icon-lg">
                <use xlink:href="assets/icons/sprites/free.svg#cil-menu"></use>
            </svg>
        </button>
        <ul class="header-nav d-none d-lg-flex">
            <li class="nav-item"><a class="nav-link" href="#">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Users</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Settings</a></li>
        </ul>
        <ul class="header-nav ms-auto">
            <li class="nav-item dropdown">
                <button class="btn btn-link nav-link py-2 px-2 d-flex align-items-center" type="button" aria-expanded="false" data-coreui-toggle="dropdown">
                    <svg class="icon icon-lg locale-icon-active">
                        <use xlink:href="assets/icons/sprites/free.svg#cil-language"></use>
                    </svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="--cui-dropdown-min-width: 8rem;">
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button" data-locale-value="en">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/flag.svg#cif-us"></use>
                            </svg>{{ __('messages.english') }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button" data-locale-value="vi">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/flag.svg#cif-vn"></use>
                            </svg>{{ __('messages.vietnamese') }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button" data-locale-value="cn">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/flag.svg#cif-cn"></use>
                            </svg>{{ __('messages.chinese') }}
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="header-nav">
            <li class="nav-item py-1">
                <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown">
                <button class="btn btn-link nav-link py-2 px-2 d-flex align-items-center" type="button" aria-expanded="false" data-coreui-toggle="dropdown">
                    <svg class="icon icon-lg theme-icon-active">
                        <use xlink:href="assets/icons/sprites/free.svg#cil-contrast"></use>
                    </svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="--cui-dropdown-min-width: 8rem;">
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button" data-theme-value="light">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/free.svg#cil-sun"></use>
                            </svg>{{__('messages.light-mode') }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button" data-theme-value="dark">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/free.svg#cil-moon"></use>
                            </svg>{{__('messages.dark-mode') }}
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center active" type="button" data-theme-value="auto">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="assets/icons/sprites/free.svg#cil-contrast"></use>
                            </svg>{{__('messages.auto-mode') }}
                        </button>
                    </li>
                </ul>
            </li>
            <li class="nav-item py-1">
                <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link py-0 pe-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-md"><img class="avatar-img" src="assets/img/avatars/2.jpg" alt="user@email.com"></div></a>
{{--                <div class="dropdown-menu dropdown-menu-end pt-0">--}}
{{--                    <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold rounded-top mb-2">Account</div><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-bell"></use>--}}
{{--                        </svg> Updates<span class="badge badge-sm bg-info ms-2">42</span></a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-envelope-open"></use>--}}
{{--                        </svg> Messages<span class="badge badge-sm bg-success ms-2">42</span></a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-task"></use>--}}
{{--                        </svg> Tasks<span class="badge badge-sm bg-danger ms-2">42</span></a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-comment-square"></use>--}}
{{--                        </svg> Comments<span class="badge badge-sm bg-warning ms-2">42</span></a>--}}
{{--                    <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold my-2">--}}
{{--                        <div class="fw-semibold">Settings</div>--}}
{{--                    </div><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-user"></use>--}}
{{--                        </svg> Profile</a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-settings"></use>--}}
{{--                        </svg> Settings</a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-credit-card"></use>--}}
{{--                        </svg> Payments<span class="badge badge-sm bg-secondary ms-2">42</span></a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-file"></use>--}}
{{--                        </svg> Projects<span class="badge badge-sm bg-primary ms-2">42</span></a>--}}
{{--                    <div class="dropdown-divider"></div><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-lock-locked"></use>--}}
{{--                        </svg> Lock Account</a><a class="dropdown-item" href="#">--}}
{{--                        <svg class="icon me-2">--}}
{{--                            <use xlink:href="assets/icons/sprites/free.svg#cil-account-logout"></use>--}}
{{--                        </svg> Logout</a>--}}
{{--                </div>--}}
            </li>
        </ul>
    </div>
    <div class="container-fluid px-4">
        @include('partial.breadcrumb')
    </div>
</header>
