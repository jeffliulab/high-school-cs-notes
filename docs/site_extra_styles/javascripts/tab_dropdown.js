// 顶部标签页悬停下拉预览菜单（支持二级→三级子菜单，三级带链接）
// 此文件由 hooks/generate_dropdown.py 自动生成，请勿手动编辑
// 如需修改 UI 逻辑，请编辑 hooks/tab_dropdown.tpl.js
(function () {
  var tabData = {"AP CSA": [{"name": "考纲总览", "path": "AP_CSA/", "pages": []}, {"name": "第一单元 使用对象与方法", "path": "", "pages": [["单元总览", "AP_CSA/unit1/"], ["程序与软件工程导论", "AP_CSA/unit1/software_engineering/"], ["变量与基本数据类型", "AP_CSA/unit1/variables_types/"], ["表达式与赋值", "AP_CSA/unit1/expressions_assignment/"], ["复合赋值与类型转换", "AP_CSA/unit1/compound_casting/"], ["对象与类的概念", "AP_CSA/unit1/objects_classes/"], ["方法调用", "AP_CSA/unit1/method_calls/"], ["带返回值的方法", "AP_CSA/unit1/return_values/"], ["字符串对象与方法", "AP_CSA/unit1/strings/"], ["包装类", "AP_CSA/unit1/wrapper_classes/"], ["Math 类", "AP_CSA/unit1/math_class/"]]}, {"name": "第二单元 选择与迭代", "path": "", "pages": [["单元总览", "AP_CSA/unit2/"], ["布尔表达式与关系运算", "AP_CSA/unit2/boolean_expressions/"], ["if 与 if-else 语句", "AP_CSA/unit2/if_statements/"], ["逻辑运算符与德摩根定律", "AP_CSA/unit2/logical_operators/"], ["嵌套条件与多分支", "AP_CSA/unit2/nested_conditionals/"], ["while 循环", "AP_CSA/unit2/while_loops/"], ["for 循环", "AP_CSA/unit2/for_loops/"], ["嵌套循环", "AP_CSA/unit2/nested_loops/"], ["算法与非正式运行时分析", "AP_CSA/unit2/informal_runtime/"]]}, {"name": "第三单元 类的创建", "path": "", "pages": [["单元总览", "AP_CSA/unit3/"], ["类的结构", "AP_CSA/unit3/class_anatomy/"], ["构造方法与 new 运算符", "AP_CSA/unit3/constructors/"], ["访问器与修改器方法", "AP_CSA/unit3/accessor_mutator/"], ["this 关键字与参数传递", "AP_CSA/unit3/this_parameters/"], ["静态变量与静态方法", "AP_CSA/unit3/static_members/"], ["作用域与访问控制", "AP_CSA/unit3/scope_access/"], ["封装与 javadoc 设计", "AP_CSA/unit3/encapsulation_javadoc/"]]}, {"name": "第四单元 数据集合", "path": "", "pages": [["单元总览", "AP_CSA/unit4/"], ["一维数组", "AP_CSA/unit4/arrays/"], ["数组遍历与 for-each", "AP_CSA/unit4/array_traversal/"], ["数组标准算法", "AP_CSA/unit4/array_algorithms/"], ["ArrayList", "AP_CSA/unit4/arraylist/"], ["ArrayList 标准算法", "AP_CSA/unit4/arraylist_algorithms/"], ["二维数组", "AP_CSA/unit4/array_2d/"], ["二维数组遍历", "AP_CSA/unit4/array_2d_traversal/"], ["文本文件与 Scanner", "AP_CSA/unit4/text_files_scanner/"], ["顺序查找与二分查找", "AP_CSA/unit4/searching/"], ["排序算法", "AP_CSA/unit4/sorting/"], ["递归", "AP_CSA/unit4/recursion/"]]}], "USACO Bronze": [{"name": "考纲总览", "path": "Bronze/", "pages": []}, {"name": "入门", "path": "", "pages": [["时间复杂度", "Bronze/time_complexity/"], ["数据结构入门", "Bronze/intro_data_structures/"], ["模拟", "Bronze/simulation/"]]}, {"name": "完全搜索", "path": "", "pages": [["基础完全搜索", "Bronze/complete_search_basic/"], ["递归完全搜索", "Bronze/complete_search_recursion/"]]}, {"name": "排序与集合", "path": "", "pages": [["排序入门", "Bronze/intro_sorting/"], ["集合与映射", "Bronze/sets_maps/"]]}, {"name": "进阶专题", "path": "", "pages": [["分类讨论", "Bronze/casework/"], ["贪心入门", "Bronze/intro_greedy/"], ["图论入门", "Bronze/intro_graphs/"], ["矩形几何", "Bronze/rectangle_geometry/"], ["Ad Hoc 杂题", "Bronze/ad_hoc/"]]}], "USACO Silver": [{"name": "考纲总览", "path": "Silver/", "pages": []}, {"name": "前缀和", "path": "", "pages": [["前缀和入门", "Silver/prefix_sums/"], ["前缀和进阶", "Silver/prefix_sums_advanced/"]]}, {"name": "排序与查找", "path": "", "pages": [["双指针", "Silver/two_pointers/"], ["有序数组二分", "Silver/binary_search_sorted/"], ["二分答案", "Silver/binary_search/"], ["自定义比较器与坐标压缩", "Silver/custom_comparators/"], ["排序贪心", "Silver/greedy_sorting/"], ["优先队列", "Silver/priority_queues/"]]}, {"name": "图论", "path": "", "pages": [["图的遍历", "Silver/graph_traversal/"], ["洪水填充", "Silver/flood_fill/"], ["树算法入门", "Silver/intro_trees/"], ["函数图", "Silver/functional_graphs/"]]}, {"name": "其他专题", "path": "", "pages": [["位运算入门", "Silver/bitwise/"]]}], "USACO Gold": [{"name": "考纲总览", "path": "Gold/", "pages": []}, {"name": "数学", "path": "", "pages": [["整除", "Gold/divisibility/"], ["模运算", "Gold/modular_arithmetic/"], ["组合数学", "Gold/combinatorics/"]]}, {"name": "动态规划", "path": "", "pages": [["DP 入门", "Gold/intro_dp/"], ["背包", "Gold/knapsack/"], ["网格路径", "Gold/grid_paths/"], ["最长上升子序列", "Gold/lis/"], ["状压 DP", "Gold/bitmask_dp/"], ["区间 DP", "Gold/range_dp/"], ["数位 DP", "Gold/digit_dp/"]]}, {"name": "图论", "path": "", "pages": [["无权最短路", "Gold/unweighted_shortest_path/"], ["并查集", "Gold/dsu/"], ["拓扑排序", "Gold/topological_sort/"], ["非负权最短路", "Gold/dijkstra/"], ["最小生成树", "Gold/mst/"]]}, {"name": "数据结构", "path": "", "pages": [["有序集合进阶", "Gold/sorted_sets/"], ["栈", "Gold/stacks/"], ["滑动窗口", "Gold/sliding_window/"], ["单点修改区间和", "Gold/point_update_range_sum/"]]}, {"name": "树", "path": "", "pages": [["欧拉序", "Gold/euler_tour/"], ["树形 DP 入门", "Gold/dp_on_trees/"], ["换根 DP", "Gold/all_roots_dp/"]]}, {"name": "其他专题", "path": "", "pages": [["哈希", "Gold/hashing/"], ["折半搜索", "Gold/meet_in_middle/"], ["单峰函数三分", "Gold/ternary_search/"]]}], "USACO Platinum": [{"name": "考纲总览", "path": "Platinum/", "pages": []}, {"name": "区间查询", "path": "", "pages": [["线段树进阶应用", "Platinum/segtree_applications/"], ["扫描线区间查询", "Platinum/sweep_line_range/"], ["区间修改区间查询", "Platinum/range_update_range_query/"], ["动态开点线段树", "Platinum/sparse_segtree/"], ["二维区间查询", "Platinum/range_queries_2d/"], ["分治求静态区间查询", "Platinum/dc_static_range/"], ["分块", "Platinum/sqrt_decomposition/"]]}, {"name": "树", "path": "", "pages": [["倍增", "Platinum/binary_jumping/"], ["启发式合并", "Platinum/small_to_large/"], ["重链剖分", "Platinum/hld/"], ["点分治", "Platinum/centroid_decomposition/"], ["虚树", "Platinum/virtual_tree/"], ["Kruskal 重构树", "Platinum/kruskal_reconstruction/"]]}, {"name": "几何", "path": "", "pages": [["几何基础", "Platinum/geometry_primitives/"], ["扫描线", "Platinum/sweep_line/"], ["凸包", "Platinum/convex_hull/"], ["斜率优化", "Platinum/convex_hull_trick/"]]}, {"name": "杂项", "path": "", "pages": [["容斥原理", "Platinum/inclusion_exclusion/"], ["矩阵快速幂", "Platinum/matrix_exponentiation/"], ["bitset", "Platinum/bitsets/"], ["分治优化 DP", "Platinum/dc_dp/"], ["子集和 DP", "Platinum/sos_dp/"]]}]};

  if (typeof tabData === "undefined") return;

  function getBase() {
    var path = window.location.pathname;
    var match = path.match(/^(\/finance-notes\/)/);
    return match ? match[1] : "/finance-notes/";
  }

  var currentDropdown = null;
  var currentTab = null;
  var currentSubMenu = null;

  function hideAll() {
    if (currentSubMenu) { currentSubMenu.remove(); currentSubMenu = null; }
    if (currentDropdown) { currentDropdown.remove(); currentDropdown = null; currentTab = null; }
  }

  function hideSubMenu() {
    if (currentSubMenu) { currentSubMenu.remove(); currentSubMenu = null; }
  }

  function showSubMenu(itemEl, pages, base, parentRect) {
    hideSubMenu();
    var sub = document.createElement("div");
    sub.className = "tab-dropdown tab-submenu";
    pages.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "tab-dropdown__item";
      a.textContent = p[0];
      a.href = base + p[1];
      sub.appendChild(a);
    });
    var itemRect = itemEl.getBoundingClientRect();
    sub.style.position = "fixed";
    sub.style.top = itemRect.top + "px";
    sub.style.left = parentRect.right + 2 + "px";
    document.body.appendChild(sub);
    currentSubMenu = sub;
  }

  function show(link, sections) {
    if (currentTab === link) return;
    hideAll();
    currentTab = link;
    var base = getBase();
    var rect = link.getBoundingClientRect();
    var el = document.createElement("div");
    el.className = "tab-dropdown";
    sections.forEach(function (sec) {
      var a = document.createElement("a");
      a.className = "tab-dropdown__item";
      a.textContent = sec.name;
      a.href = sec.path ? base + sec.path : (link.getAttribute("href") || link.href);
      if (sec.pages && sec.pages.length > 0) {
        a.classList.add("has-submenu");
        a.addEventListener("mouseenter", function () {
          showSubMenu(a, sec.pages, base, el.getBoundingClientRect());
        });
      } else {
        a.addEventListener("mouseenter", hideSubMenu);
      }
      el.appendChild(a);
    });
    el.style.position = "fixed";
    el.style.top = rect.bottom + "px";
    el.style.left = rect.left + rect.width / 2 + "px";
    el.style.transform = "translateX(-50%)";
    document.body.appendChild(el);
    currentDropdown = el;
  }

  function init() {
    var tabsBar = document.querySelector(".md-tabs");
    if (!tabsBar || tabsBar.getAttribute("data-dd")) return;
    tabsBar.setAttribute("data-dd", "1");

    document.querySelectorAll(".md-tabs__link").forEach(function (link) {
      var text = link.textContent.trim();
      var sections = tabData[text];
      if (!sections) return;
      link.addEventListener("mouseenter", function () { show(link, sections); });
    });

    document.addEventListener("mousemove", function (e) {
      if (!currentDropdown) return;
      var tbr = document.querySelector(".md-tabs").getBoundingClientRect();
      var ddr = currentDropdown.getBoundingClientRect();
      var inTabs = e.clientY >= tbr.top && e.clientY <= tbr.bottom + 4
                   && e.clientX >= tbr.left && e.clientX <= tbr.right;
      var inDd = e.clientY >= ddr.top - 4 && e.clientY <= ddr.bottom
                 && e.clientX >= ddr.left && e.clientX <= ddr.right;
      var inSub = false;
      if (currentSubMenu) {
        var sr = currentSubMenu.getBoundingClientRect();
        inSub = e.clientY >= sr.top && e.clientY <= sr.bottom
                && e.clientX >= sr.left - 4 && e.clientX <= sr.right;
      }
      if (!inTabs && !inDd && !inSub) hideAll();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () { init(); });
  }
})();
