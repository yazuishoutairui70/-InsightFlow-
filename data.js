// All case material below is authored for interaction demos. It is not scraped or observed customer data.
export const cases = [
  {
    id: 'xiaohongshu', name: '小红书', english: 'Xiaohongshu', kind: '购物 App', template: '购物平台模板',
    initials: '小', tone: 'red', updated: '演示案例 · 2026.10',
    subtitle: '从内容种草到消费决策的体验路径',
    summary: '内容发现和社区互动让商品决策嵌入日常浏览；能否稳定完成从兴趣到购买的承接，是这个案例最值得观察的变量。',
    tags: ['内容驱动', '社区信任', '搜索与推荐', '转化承接'],
    positioning: '面向有生活方式探索需求的用户，在浏览、搜索与分享场景中，用内容和社区经验辅助消费决策的平台。',
    audience: '希望获得真实经验、灵感和选择依据的用户；此处为演示画像，不代表平台官方用户统计。',
    opportunity: '把内容中的产品线索、评论疑问和购买入口衔接得更清晰，同时保留社区信任感。',
    modules: [
      {id:'position', title:'定位与用户', icon:'users', angle:'看用户为什么把它当作决策入口', fact:'内容、搜索和互动构成了用户探索路径。', why:'用户需要的不只是商品参数，还包括场景化经验与他人反馈。', implication:'区分“找灵感”和“带着明确需求搜索”两类任务设计入口。', evidence:'E-01', status:'推断'},
      {id:'supply', title:'内容与供给', icon:'grid', angle:'看内容如何承担商品解释', fact:'笔记、图文与短视频可以同时承载体验、细节与使用场景。', why:'内容降低理解门槛，但商业信息和个人经验混合时会增加判断成本。', implication:'为内容真实性与商品信息分别建立可识别线索。', evidence:'E-02', status:'推断'},
      {id:'discovery', title:'流量与发现', icon:'search', angle:'看搜索和推荐承担什么任务', fact:'用户可能通过主动搜索，也可能通过推荐流接触产品。', why:'主动需求和被动发现的决策阶段不同。', implication:'评价推荐时关注启发，评价搜索时关注答案完整度。', evidence:'E-03', status:'推断'},
      {id:'conversion', title:'转化链路', icon:'cart', angle:'看从被种草到行动的断点', fact:'内容消费、评论求证、商品比较和下单可能跨越多个步骤。', why:'任何一步的信息不连续都可能让用户暂缓决策。', implication:'在不破坏内容体验的前提下呈现价格、规格和购买路径。', evidence:'E-04', status:'待验证'},
      {id:'trust', title:'信任与留存', icon:'shield', angle:'看社区关系为何形成复访', fact:'用户会借助评论、收藏和创作者历史内容判断可信度。', why:'决策信任来自可验证的具体体验，而非单一宣传话术。', implication:'把“评价依据”设计成可追溯的内容层，而非只堆叠好评。', evidence:'E-05', status:'推断'},
      {id:'reviews', title:'用户评价', icon:'chat', angle:'识别用户表达出的期待与摩擦', fact:'合成评论样本同时包含发现效率、真实性与购买衔接话题。', why:'正负反馈会围绕不同任务出现，不能用一个情绪分数替代解释。', implication:'按任务阶段聚类，再决定改善发现、信任还是转化。', evidence:'E-06', status:'演示样本'}
    ],
    insights: [
      {id:'x1', title:'让“发现”与“决策”拥有不同的信息密度', level:'优先借鉴', theme:'发现效率', fact:'内容流适合激发兴趣；明确搜索时用户更需要可比较信息。', logic:'同一平台承载两种意图，统一的信息结构可能无法同时满足。', action:'在搜索结果或收藏夹加入关键差异、适用场景和证据摘要。', condition:'适用于既有内容生态又需要提高决策效率的产品。', risk:'摘要过度压缩会丢失原评论语境。', refs:['E-02','E-03','R-03'], confidence:'中'},
      {id:'x2', title:'把真实性变成可检查的证据', level:'可迁移', theme:'信任机制', fact:'评论样本反复提到“真实体验”和信息辨别。', logic:'用户不是单纯需要更多内容，而是需要判断内容可信程度的线索。', action:'让体验细节、时间、使用条件和利益关系在内容附近可见。', condition:'适用于用户决策受 UGC 影响明显的品牌或平台。', risk:'不可把演示评论的频次当成真实用户规模。', refs:['E-05','R-02','R-08'], confidence:'中'},
      {id:'x3', title:'跨步骤承接前先验证断点', level:'需要验证', theme:'转化链路', fact:'合成样本出现从内容到购买信息不连贯的反馈。', logic:'若真实用户也在这一段流失，增加行动入口才有价值。', action:'先测量从笔记查看、商品比较到下单的阶段转化，再做小流量实验。', condition:'需取得真实漏斗数据后实施。', risk:'演示数据不能证明实际流失率。', refs:['E-04','R-06'], confidence:'低'}
    ],
    evidence: [
      {id:'E-01', type:'演示观察卡', title:'用户任务：探索与求证', note:'由产品常见场景构造的分析素材，非平台调查。'},
      {id:'E-02', type:'演示观察卡', title:'内容形式与场景呈现', note:'用于说明内容承载商品信息的分析方法。'},
      {id:'E-03', type:'演示观察卡', title:'主动搜索／被动推荐路径', note:'示意两种发现路径；实际流量占比未知。'},
      {id:'E-04', type:'待验证', title:'从内容到交易的路径假设', note:'未接入埋点或真实交易数据，不能判断真实转化效果。'},
      {id:'E-05', type:'演示观察卡', title:'评论与创作者信任线索', note:'推演用户可能检查的可信度信号。'},
      {id:'E-06', type:'合成评论', title:'中英文虚构用户反馈', note:'为演示聚类与筛选而写，不代表真实用户评价。'}
    ],
    reviews: [
      {id:'R-01', lang:'中文', sentiment:'正向', theme:'发现效率', text:'随手刷到很多生活灵感，原本没想到要买的东西也会想收藏起来。', translation:'Browsing gives me plenty of lifestyle ideas, and I save products I had not considered before.'},
      {id:'R-02', lang:'中文', sentiment:'负向', theme:'信任机制', text:'想知道哪些是长期使用后的感受，哪些只是刚拿到产品的推荐。', translation:'I want to tell long-term experience apart from first-impression recommendations.'},
      {id:'R-03', lang:'英文', sentiment:'正向', theme:'发现效率', text:'The search results gave me real use-case ideas instead of just a product list.', translation:'搜索结果提供了真实使用场景的灵感，而不只是商品列表。'},
      {id:'R-04', lang:'中文', sentiment:'中性', theme:'内容与供给', text:'同一件东西有很多种搭配笔记，比较适合先找思路再慢慢筛。', translation:'There are many ways to style the same item; I use it for ideas before narrowing down.'},
      {id:'R-05', lang:'英文', sentiment:'负向', theme:'信任机制', text:'Sometimes I cannot tell whether a recommendation is sponsored or simply personal.', translation:'有时我分不清推荐是商业合作还是个人分享。'},
      {id:'R-06', lang:'中文', sentiment:'负向', theme:'转化链路', text:'看完种草内容之后还得自己查规格和价格，买之前会多跳几个页面。', translation:'After a recommendation I still check specifications and prices elsewhere before buying.'},
      {id:'R-07', lang:'英文', sentiment:'正向', theme:'内容与供给', text:'Detailed photos help me imagine how the product works in a small apartment.', translation:'细节照片帮助我想象产品在小户型里的实际使用方式。'},
      {id:'R-08', lang:'中文', sentiment:'中性', theme:'信任机制', text:'我会先看评论区有没有不同意见，再决定要不要收藏。', translation:'I look for alternative opinions in the comments before saving a post.'}
    ]
  },
  {
    id:'uniqlo', name:'优衣库', english:'UNIQLO', kind:'服饰零售品牌', template:'品牌模板 · 服饰零售适配',
    initials:'U', tone:'crimson', updated:'演示案例 · 2026.10',
    subtitle:'基础款、场景表达与线上线下衔接',
    summary:'基础款与功能表达可以降低日常穿搭的选择难度；不同体型的适配体验和购买路径，是品牌承诺能否落到个人身上的关键。',
    tags:['日常穿搭', '基础款', '门店体验', '尺码适配'],
    positioning:'面向希望简化日常穿衣决策的用户，在通勤、休闲和季节变化中提供易搭配的服饰选择。',
    audience:'重视实穿性、价格与搭配效率的消费者；此处为演示画像，不是官方人群统计。',
    opportunity:'将“基础款的场景价值”与个人尺码、试穿反馈和跨渠道购物体验连接。',
    modules:[
      {id:'position',title:'品牌定位',icon:'target',angle:'看谁在什么场景选择它',fact:'演示分析以基础款、功能表达与日常场景为切入点。',why:'日常服饰的核心任务是降低选择成本并适配多种场景。',implication:'不要只列产品参数，应说明具体穿着时刻的价值。',evidence:'E-01',status:'推断'},
      {id:'portfolio',title:'产品组合',icon:'grid',angle:'看核心单品承担什么角色',fact:'基础款、季节性单品与联名/主题内容可承担不同的决策任务。',why:'基础款提供稳定选择，主题内容创造新的进入理由。',implication:'分析核心 SKU、搭配方案和上新节奏的角色分工。',evidence:'E-02',status:'推断'},
      {id:'expression',title:'场景与表达',icon:'spark',angle:'看功能如何被转译为生活价值',fact:'面料或版型特征需要通过可感知的使用场景表达。',why:'消费者买的是舒适、便利和自我呈现，不只是技术名词。',implication:'为每类核心产品匹配清晰的用户、场景和可信依据。',evidence:'E-03',status:'推断'},
      {id:'pricing',title:'价格与渠道',icon:'tag',angle:'看比较和购买如何发生',fact:'线上浏览和线下试穿可在同一购物旅程中相互补充。',why:'服饰存在尺码和体感不确定性，线下体验可以降低风险。',implication:'在用户需要时提供可理解的尺码、库存和门店信息。',evidence:'E-04',status:'待验证'},
      {id:'experience',title:'门店与服务',icon:'store',angle:'看服务是否兑现品牌承诺',fact:'陈列、试衣和取货流程都影响用户对“省心”的感知。',why:'便利性要贯穿发现、试穿、付款和售后。',implication:'按任务路径而非单个接触点检查体验。',evidence:'E-05',status:'推断'},
      {id:'reviews',title:'用户评价',icon:'chat',angle:'看版型、尺码与耐穿反馈',fact:'合成评论围绕搭配、尺码、材质和购物效率。',why:'相同单品对不同体型和使用场景的价值不同。',implication:'将评价按体型/场景/使用周期分层，而非只看平均分。',evidence:'E-06',status:'演示样本'}
    ],
    insights:[
      {id:'u1',title:'以具体场景讲清基础款的价值',level:'优先借鉴',theme:'场景表达',fact:'合成样本更容易描述“通勤好搭”而非抽象产品技术。',logic:'场景让产品能力转化成用户可想象的收益。',action:'围绕通勤、出游、换季建立穿搭任务页，并标明适用条件。',condition:'适合卖点相对基础、需要靠搭配解释价值的品牌。',risk:'不能把所有用户归为同一种穿搭需求。',refs:['E-03','R-01','R-03'],confidence:'中'},
      {id:'u2',title:'用结构化试穿反馈减少尺码焦虑',level:'可迁移',theme:'尺码适配',fact:'样本中有用户想看与自己身形接近的试穿信息。',logic:'通用尺码表不能充分替代体感与版型描述。',action:'展示身高、常穿尺码、版型偏好等自愿提供的匿名化反馈。',condition:'需保证隐私与样本数量，并明确反馈非普适结论。',risk:'小样本可能造成错误的尺码建议。',refs:['E-04','R-02','R-05'],confidence:'中'},
      {id:'u3',title:'验证线上发现与门店试穿的衔接',level:'需要验证',theme:'渠道协同',fact:'合成样本描绘先线上看、再到店试的路径。',logic:'跨渠道切换若不能延续商品信息，可能增加重新寻找的成本。',action:'先观察真实用户是否频繁跨渠道，再测试收藏到店/库存提示。',condition:'需要真实行为数据与门店履约能力。',risk:'目前没有真实跨渠道转化数据。',refs:['E-04','E-05','R-07'],confidence:'低'}
    ],
    evidence:[
      {id:'E-01',type:'演示观察卡',title:'基础款与日常需求假设',note:'为展示定位分析而写，并非官方品牌战略引用。'},
      {id:'E-02',type:'演示观察卡',title:'产品组合角色示意',note:'非真实 SKU 销售数据。'},
      {id:'E-03',type:'演示观察卡',title:'场景化价值表达示意',note:'用于演示功能到价值的推理链。'},
      {id:'E-04',type:'待验证',title:'线上线下购物路径假设',note:'未接入库存、转化或门店数据。'},
      {id:'E-05',type:'演示观察卡',title:'门店体验触点示意',note:'不是实际门店审计。'},
      {id:'E-06',type:'合成评论',title:'中英文虚构用户反馈',note:'仅供交互演示。'}
    ],
    reviews:[
      {id:'R-01',lang:'中文',sentiment:'正向',theme:'场景表达',text:'基础款上班穿省心，早上不用花很多时间想怎么搭配。',translation:'The basics make weekday outfits easier and save me time in the morning.'},
      {id:'R-02',lang:'中文',sentiment:'负向',theme:'尺码适配',text:'同样的尺码在不同版型上体感不太一样，还是想看更多真实试穿参考。',translation:'The same size feels different across cuts; I want more real try-on references.'},
      {id:'R-03',lang:'英文',sentiment:'正向',theme:'场景表达',text:'I can wear the same simple shirt to work and on a casual weekend.',translation:'同一件简单的衬衫既能上班穿，也适合周末休闲。'},
      {id:'R-04',lang:'中文',sentiment:'中性',theme:'产品组合',text:'换季时会先看基础款，再决定有没有需要添的新颜色。',translation:'At the turn of a season, I look at basics first, then decide on a new color.'},
      {id:'R-05',lang:'英文',sentiment:'负向',theme:'尺码适配',text:'The size chart did not tell me how the fabric would actually fall on my shoulders.',translation:'尺码表没告诉我面料穿在肩膀上实际会怎样垂落。'},
      {id:'R-06',lang:'中文',sentiment:'负向',theme:'材质体验',text:'照片看起来不错，但我更想知道洗过几次之后的版型变化。',translation:'The photos look good, but I want to know how the fit changes after washing.'},
      {id:'R-07',lang:'英文',sentiment:'中性',theme:'渠道协同',text:'I browse online first and visit a store when I need to check the fit.',translation:'我先在线上看，想确认版型时再去门店试穿。'},
      {id:'R-08',lang:'中文',sentiment:'正向',theme:'购物效率',text:'门店里分类清楚，目标明确的时候能比较快找到想要的款式。',translation:'The store layout helps me find a specific item quickly.'}
    ]
  },
  {
    id:'manner',name:'Manner Coffee',english:'MANNER',kind:'线下实体品牌',template:'线下实体模板',
    initials:'M',tone:'coffee',updated:'演示案例 · 2026.10',
    subtitle:'日常咖啡场景与门店履约体验',
    summary:'咖啡消费的关键不只在产品本身，还在通勤与工作间隙能否稳定、快速地完成一次购买；高峰排队和体验一致性值得重点验证。',
    tags:['通勤场景','出杯效率','门店触点','复购习惯'],
    positioning:'面向需要日常咖啡的城市用户，在通勤和工作间隙提供相对便捷的现制咖啡体验。',
    audience:'时间敏感、愿意在日常路径中顺手买咖啡的用户；此处为演示画像。',
    opportunity:'在高峰期兼顾效率与产品稳定性，并让用户清楚预期等待时间。',
    modules:[
      {id:'location',title:'位置与人群',icon:'pin',angle:'看门店如何嵌入固定路线',fact:'演示分析聚焦通勤和工作日间隙购买场景。',why:'线下咖啡的到店成本与消费频次紧密相关。',implication:'评估选址时同时观察步行路径与时段，而不是仅看客流。',evidence:'E-01',status:'推断'},
      {id:'product',title:'产品与菜单',icon:'coffee',angle:'看常点款与选择复杂度',fact:'用户在熟悉菜单时往往希望快速完成重复购买。',why:'高频场景里，选择效率本身是产品价值的一部分。',implication:'区分首次探索与重复点单的菜单信息层级。',evidence:'E-02',status:'推断'},
      {id:'price',title:'价格与价值',icon:'tag',angle:'看日常复购的价值感',fact:'合成样本将口味、便利与等待放在一起评价。',why:'实际付出的成本包括金钱、时间和体验不确定性。',implication:'用“总体验价值”而非只看标价分析竞争力。',evidence:'E-03',status:'演示样本'},
      {id:'service',title:'服务与空间',icon:'store',angle:'看排队和取餐的关键瞬间',fact:'高峰时段的排队、叫号与取餐决定交易体验。',why:'流程中最慢的一环会放大用户对等待的感知。',implication:'先识别高峰瓶颈，再考虑预约、动线或等待信息。',evidence:'E-04',status:'待验证'},
      {id:'retention',title:'复购与口碑',icon:'repeat',angle:'看习惯如何形成',fact:'固定路线和稳定体验可能促成重复购买。',why:'用户复购更多依赖可预期的日常便利，而非一次性促销。',implication:'围绕重复购买的稳定性设指标，不只追单次活动曝光。',evidence:'E-05',status:'推断'},
      {id:'reviews',title:'用户评价',icon:'chat',angle:'比较高峰与非高峰反馈',fact:'合成评论涵盖速度、口味一致性与点单便利。',why:'相同店铺在不同时间段可能表现不同。',implication:'评价分析需按时段、店型和购买任务分组。',evidence:'E-06',status:'演示样本'}
    ],
    insights:[
      {id:'m1',title:'把“稳定的时间预期”当作产品体验',level:'优先借鉴',theme:'服务效率',fact:'演示样本对高峰等待的容忍度低于非高峰。',logic:'通勤用户担心的不是任何等待，而是不可预期的等待。',action:'展示预计等待区间，并测试高峰时段的下单与取餐提醒。',condition:'适合日常路径型、高峰明显的线下业态。',risk:'预计时间不准反而损害信任。',refs:['E-04','R-02','R-05'],confidence:'中'},
      {id:'m2',title:'重复购买路径优先于复杂营销',level:'可迁移',theme:'复购习惯',fact:'合成反馈出现“每天路过”和“常点同一款”。',logic:'高频线下品牌的惯性来自低摩擦和可预期。',action:'减少老顾客重选成本，保留清晰的常购入口。',condition:'已有足够复购需求时才有价值。',risk:'过度偏向老客可能压缩新品探索。',refs:['E-02','E-05','R-01'],confidence:'中'},
      {id:'m3',title:'门店评价必须按时段解释',level:'需要验证',theme:'体验一致性',fact:'样本中的口味与速度反馈在不同场景出现。',logic:'汇总评分会掩盖峰谷差异和具体运营问题。',action:'拿到真实评价后按时段和门店聚类，对照出杯与排队记录。',condition:'需要真实门店运营和评论数据。',risk:'当前合成样本不能证明任何门店的问题。',refs:['E-06','R-03','R-06'],confidence:'低'}
    ],
    evidence:[
      {id:'E-01',type:'演示观察卡',title:'通勤路径与时段假设',note:'并非实际选址或客流数据。'},
      {id:'E-02',type:'演示观察卡',title:'首次／复购菜单任务',note:'示意两种点单任务。'},
      {id:'E-03',type:'合成评论',title:'口味、时间与价值感',note:'没有真实价格与消费者调研。'},
      {id:'E-04',type:'待验证',title:'高峰排队流程假设',note:'未对任何门店现场测量。'},
      {id:'E-05',type:'演示观察卡',title:'习惯性复购路径',note:'并非真实会员或复购数据。'},
      {id:'E-06',type:'合成评论',title:'中英文虚构用户反馈',note:'仅用于界面与洞察流程演示。'}
    ],
    reviews:[
      {id:'R-01',lang:'中文',sentiment:'正向',theme:'复购习惯',text:'每天上班路过会顺手买一杯，点熟悉的口味很省事。',translation:'I pass by on my way to work and a familiar order is easy.'},
      {id:'R-02',lang:'中文',sentiment:'负向',theme:'服务效率',text:'赶时间的时候最怕不知道前面还要等多久。',translation:'When I am in a rush, not knowing the wait is the frustrating part.'},
      {id:'R-03',lang:'英文',sentiment:'正向',theme:'产品体验',text:'The coffee feels like an easy part of my weekday routine.',translation:'买咖啡已经轻松融入我工作日的日常。'},
      {id:'R-04',lang:'中文',sentiment:'中性',theme:'价格价值',text:'我会把味道、路程和等待时间一起算，不只是比较一杯多少钱。',translation:'I weigh taste, distance and waiting time, not just the price.'},
      {id:'R-05',lang:'英文',sentiment:'负向',theme:'服务效率',text:'I wish the app gave a clearer pickup time during the morning rush.',translation:'希望早高峰时能更清楚地看到预计取餐时间。'},
      {id:'R-06',lang:'中文',sentiment:'负向',theme:'体验一致性',text:'忙的时候和不忙的时候，喝起来的感觉有时不太一样。',translation:'The experience can feel different between busy and quiet hours.'},
      {id:'R-07',lang:'英文',sentiment:'中性',theme:'点单便利',text:'I usually order the same thing and do not need to browse the whole menu.',translation:'我通常点同一款，不需要每次都看完整份菜单。'},
      {id:'R-08',lang:'中文',sentiment:'正向',theme:'位置场景',text:'门店就在工作路线附近，临时想喝咖啡时很方便。',translation:'The shop is along my commute, so it is convenient for a spontaneous coffee.'}
    ]
  }
];

export const byId = id => cases.find(item => item.id === id) || cases[0];
