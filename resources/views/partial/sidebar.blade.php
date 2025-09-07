<div class="sidebar sidebar-dark sidebar-fixed border-end" id="sidebar">
    <div class="sidebar-header border-bottom">
        <h4 class="sidebar-brand" style="width: 100%;text-align: center; margin-bottom: 0">ZGS</h4>
        <button class="btn-close d-lg-none" type="button" data-theme="dark" aria-label="Close" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()"></button>
    </div>
    <ul class="sidebar-nav" data-coreui="navigation" data-simplebar>
        <li class="nav-title">{{ __('app.sidebar.config') }}</li>
        <li class="nav-item"><a class="nav-link" href="{{route('config')}}">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-file-add"></use>
            </svg> {{ __('app.sidebar.upload') }}</a>
        </li>

        <li class="nav-title">{{ __('family.title') }}</li>
        <li class="nav-item"><a class="nav-link" href="#1">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/free.svg') }}#cil-info"></use>
            </svg> {{ __('family.info') }}</a> {{-- ZiBei_Now, Member_First, FamilyData --}}
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/free.svg') }}#cil-people"></use>
            </svg> {{ __('family.members') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#4"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.family-members') }}</a></li> {{-- Member now --}}
                <li class="nav-item"><a class="nav-link" href="#5"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.other-members') }}</a></li> {{-- Member_qu --}}
                <li class="nav-item"><a class="nav-link" href="#6"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.guests') }}</a></li> {{-- MenKe_Now --}}
                <li class="nav-item"><a class="nav-link" href="#9"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.death') }}</a></li> {{-- Member_Ci --}}
            </ul>
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-balance-scale"></use>
            </svg> {{ __('family.commerce') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.currency') }}</a></li> {{-- CGNum  --}}
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.food') }}</a></li> {{-- Prop_have  --}}
            </ul>
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
                <svg class="nav-icon">
                    <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-shield"></use>
                </svg> {{ __('family.army') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.barracks') }}</a></li> {{-- JunYing_now  --}}
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.prisoner') }}</a></li> {{-- NuLiNum  --}}
                <li class="nav-item"><a class="nav-link" href="#10"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.horse') }}</a></li> {{-- Horse_Have --}}
            </ul>
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-loop"></use>
            </svg> {{ __('family.relationship') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.king') }}</a></li> {{-- ShiJia_king  --}}
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.family') }}</a></li> {{-- ShiJia_Now  --}}
            </ul>
        </li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/free.svg') }}#cil-library-building"></use>
            </svg> {{ __('family.asset') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#11"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.trade-shop') }}</a></li> {{-- Trade_Playershop --}}
                <li class="nav-item"><a class="nav-link" href="#10"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.farm') }}</a></li> {{-- NongZ_now --}}
                <li class="nav-item"><a class="nav-link" href="#10"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('family.palace') }}</a></li> {{-- Fudi_now --}}
            </ul>
        </li>
        <li class="nav-title">{{ __('king.title') }}</li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
            <svg class="nav-icon">
                <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-city"></use>
            </svg> {{ __('king.title') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#1"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('king.info') }}</a></li> {{-- Cost_King, ShiJia_king --}}
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('king.members') }}</a></li> {{-- Member_King --}}
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('king.other-members') }}</a></li> {{-- Member_King_qu --}}
                <li class="nav-item"><a class="nav-link" href="#4"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('king.capital') }}</a></li> {{-- KingCityData_now --}}
            </ul>
        </li>
        <li class="nav-title">{{ __('other.title') }}</li>
        <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
                <svg class="nav-icon">
                    <use xlink:href="{{ Vite::asset('resources/icons/duotone.svg') }}#cid-library-books"></use>
                </svg> {{ __('other.title') }}</a>
            <ul class="nav-group-items compact">
                <li class="nav-item"><a class="nav-link" href="#1"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('other.doctor') }}</a></li> {{-- Doctor_now --}}
                <li class="nav-item"><a class="nav-link" href="#2"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('other.hanmen') }}</a></li> {{-- Member_Hanmen --}}
                <li class="nav-item"><a class="nav-link" href="#3"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('other.qinglou') }}</a></li> {{-- Member_Qinglou --}}
                <li class="nav-item"><a class="nav-link" href="#4"><span class="nav-icon"><span class="nav-icon-bullet"></span></span> {{ __('other.version') }}</a></li> {{-- VersionID --}}
            </ul>
        </li>
    </ul>
    <div class="sidebar-footer border-top d-none d-md-flex">
        <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>
</div>
