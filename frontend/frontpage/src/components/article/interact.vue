<template>
    <!-- 底部互动按钮 -->
    <div class="text-center post-actions">
            <a class="action">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zan"></use>
                </svg>
                <span>点赞</span><span>100</span>
            </a>
            <a class="action">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-moneybag"></use>
                </svg>
                <span>赞赏</span>
            </a>
            <span class="hover-show dropup action action-share">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-share1"></use>
                </svg>
                <span>分享</span>
                <div class="lz-widget hover-show-con share-button dropdown-menu">
                    <div>
                        <a class="share-btn qzone">
                            <span class="logo">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-github"></use>
                                </svg>
                            </span>
                            <span>QQ空间</span>
                        </a>
                    </div>
                </div>
            </span>
            <a class="action">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-favorite"></use>
                </svg>
                <span>赞赏</span>
            </a>
        </div>
</template>
<style lang="scss">
.action-share {
    position: relative;
    cursor: pointer;
    transition: .3s;
    .share-button{
        bottom: 100%;
        opacity: 0;
        transition: .4s;
        width: 130px;
        margin-bottom: -10px!important;
        left: -24px;
        transform: translateY(-6px);
        top: auto;
    }
}
.share-button .share-btn {
    display: flex;
    align-items: center;
    &>.logo {
        width: 36px;
        height: 36px;
        display: inline-flex;
        border-radius: 100%;
        background: var(--main-border-color);
        justify-content: center;
        align-items: center;
        font-size: 22px;
        flex-shrink: 0;
        margin-right: 10px;
        &>.icon {
            width: 1em;
            font-size: inherit;
        }
    }
}
.hover-show .hover-show-con {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transform: translateY(6px);
    transition: .4s;
}
.dropdown-menu::before, .private-content::before {
    content: " ";
    display: inline-block;
    width: 9px;
    height: 9px;
    background: var(--main-bg-color);
    position: absolute;
    top: 12px;
    transform: rotate(
45deg);
    left: -4px;
    border-radius: 2px;
}
.dropdown-menu {
    border-color: transparent;
    background: var(--main-bg-color);
    --this-color: var(--main-color);
    color: var(--this-color);
    box-shadow: 0 0 10px 8px var(--main-shadow);
    min-width: 100px;
    opacity: 0;
    transform: translateY(6px);
    transition: .3s;
    display: block;
    margin-top: 6px;
    visibility: hidden;
    list-style: none!important;
    z-index: 992;
}
.dropup .dropdown-menu::before {
    top: auto;
    bottom: -4px;
    left: 11px;
}
.dropup .share-button.dropdown-menu::before {
    left: 59px;
}
.dropup .dropdown-menu {
    bottom: 100%;
    margin-bottom: 6px;
    transform: translateY(-6px);
}

.hover-show:hover .hover-show-con, .hover-show:hover~.hover-show-con, .hover-show:hover~.sub-menu, .navbar-top li:hover>.sub-menu {
    opacity: 1;
    transform: translateY(0);
}
.hover-show:hover .hover-show-con, .hover-show:hover~.hover-show-con, .hover-show:hover~.sub-menu {
    visibility: unset;
}
</style>