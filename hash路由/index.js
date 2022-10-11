class VueRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentHash = ""; // 当前的hash
    this.refresh = this.refresh.bind(this);
    window.addEventListener("load", this.refresh, false);
    window.addEventListener("hashchange", this.refresh, false);
  }
  getUrlPath(url) {
    // 获取当前路由的hash
    return url.indexOf("#") > -1 ? url.slice(url.indexOf("#") + 1) : "/";
  }

  refresh(event) {
    let newHash = "",
      oldHash = null;
    if (event.newUrl) {
      newHash = this.getUrlPath(event.newUrl);
      oldHash = this.getUrlPath(event.oldHash);
    } else {
      newHash = this.getUrlPath(window.location.hash);
    }
    this.currentHash = newHash;
    this.matchComponent();
  }

  matchComponent() {
    let currentRoute = this.routes.find(
      (route) => route.path === this.currentHash
    );
    if (!currentRoute) {
      currentRoute = this.routes.find((route) => route.path === "/");
    }
    const { component } = currentRoute;
    document.getElementById("app").innerHTML = component;
  }
}

const router = new VueRouter([
  { path: "/", name: "home", component: "<div>首页内容</div>" },
  { path: "/shop", name: "shop", component: "<div>店铺</div>" },
  { path: "/my", name: "my", component: "<div>我的</div>" },
]);
