<div class="sidebar sidebar-dark sidebar-fixed border-end" id="sidebar">
    <div class="sidebar-header border-bottom">
        <h4 class="sidebar-brand" style="width: 100%;text-align: center; margin-bottom: 0">ZGS</h4>
        <button class="btn-close d-lg-none" type="button" data-coreui-theme="dark" aria-label="Close" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()"></button>
    </div>
    <ul class="sidebar-nav" data-coreui="navigation" data-simplebar>
{{--        <li class="nav-item"><a class="nav-link" href="#">--}}
{{--            <svg class="nav-icon">--}}
{{--                <use xlink:href="assets/icons/sprites/free.svg#cil-speedometer"></use>--}}
{{--            </svg> Dashboard<span class="badge badge-sm bg-info ms-auto">NEW</span></a></li>--}}

        <li class="nav-title">{{ __('family.title') }}</li>
        <li class="nav-item"><a class="nav-link" href="#1">
            <svg class="nav-icon">
                <use xlink:href="assets/icons/sprites/free.svg#cil-info"></use>
            </svg> {{ __('family.info') }}</a> {{-- ZiBei_Now, Member_First --}}
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="assets/icons/sprites/free.svg#cil-people"></use>
            </svg> {{ __('family.members') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#4"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.members') }}</a></li> {{-- Member now --}}
                <li class="nav-item"><a class="nav-link" href="#5"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.other-members') }}</a></li> {{-- Member_qu --}}
                <li class="nav-item"><a class="nav-link" href="#6"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.guests') }}</a></li> {{-- MenKe_Now --}}
                <li class="nav-item"><a class="nav-link" href="#9"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.death') }}</a></li> {{-- Member_Ci --}}
            </ul>
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
                <svg class="nav-icon">
                    <use xlink:href="assets/icons/sprites/duotone.svg#cid-balance-scale"></use>
                </svg> {{ __('family.commerce') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.currency') }}</a></li> {{-- CGNum  --}}
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.food') }}</a></li> {{-- Prop_have  --}}
                <li class="nav-item"><a class="nav-link" href="#10"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.horse') }}</a></li> {{-- Horse_Have --}}
                <li class="nav-item"><a class="nav-link" href="#11"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.trade-shop') }}</a></li> {{-- Trade_Playershop --}}
            </ul>
        </li>
        <li class="nav-title">{{ __('king.title') }}</li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="assets/icons/sprites/free.svg#cil-people"></use>
            </svg> {{ __('king.title') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('king.info') }}</a></li> {{-- Cost_King. ShiJia_king --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('king.members') }}</a></li> {{-- Member_King --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('king.other-members') }}</a></li> {{-- Member_King_qu --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('king.capital') }}</a></li> {{-- KingCityData_now --}}
            </ul>
        </li>

        <li class="nav-title">{{ __('other.title') }}</li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="assets/icons/sprites/free.svg#cil-drop"></use>
            </svg> {{ __('other.title') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('other.doctor') }}</a></li> {{-- Doctor_now --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('other.hanmen') }}</a></li> {{-- Member_Hanmen --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('other.qinglou') }}</a></li> {{-- Member_Qinglou --}}
                <li class="nav-item"><a class="nav-link" href="#"> {{ __('other.version') }}</a></li> {{-- VersionID --}}
            </ul>
        </li>
    </ul>
    <div class="sidebar-footer border-top d-none d-md-flex">
        <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>
</div>
