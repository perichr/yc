//Q.js
var Q=function(W,D,M,body,laHash,lash,L,LL,index,popstate,VS,Regex,key,Q){body=D.getElementsByTagName("body")[0];laHash="`";Regex=[];key="!";popstate=function(){if(laHash==location.hash)return;Q.lash=lash=location.hash.substring(key.length+1);L=lash.split("/");var i=Regex.length;while(i--)if(LL=lash.match(Regex[i][0])){LL[0]=Regex[i][1];L=LL;break}if(!Q[L[0]]){location.hash="#"+key+index;Q.lash=index;return}body.className="body-"+L[0];if(Q.pop)Q.pop.apply(W,L);laHash=location.hash;Q[L.shift()].apply(W,L)};Q={lash:"",init:function(o){if(o.key!==undefined)key=o.key;index=o.index||"V";if(o.pop&&typeof o.pop=="function")Q.pop=o.pop;popstate();"onhashchange"in W?W.onhashchange=popstate:setInterval(function(){if(laHash!=location.hash){popstate();laHash=location.hash}},100);return this},reg:function(r,u){if(!r)return;if(u==undefined)u=function(){};if(r instanceof RegExp){if(typeof u=="function"){var fn="A"+(("8"+Math.random()).substring(3)*1).toString(16);Q[fn]=u;u=fn}Regex.push([r,u])}else if(r instanceof Array){for(var i in r){L=[].concat(r[i]).concat(u);this.reg.apply(this,L)}}else if(typeof r=="string"){if(typeof u=="function"){Q[r]=u}else if(typeof u=="string"&&Q[u]){Q[r]=Q[u]}}return this},V:function(){console.log("Q.js <https://github.com/itorr/q.js> 2014/12/28");return this},go:function(u){location.hash="#"+key+u;return this}};return Q}(this,document);

//$.BlocksIt.js
(function(a) {var b={numOfCol:5,offsetX:5,offsetY:5,blockElement:"div"};var c,d;var e=[];if(!Array.prototype.indexOf) {Array.prototype.indexOf=function(a) {var b=this.length>>>0;var c=Number(arguments[1])||0;c=c<0?Math.ceil(c):Math.floor(c);if(c<0)c+=b;for(;c<b;c++) {if(c in this&&this[c]===a)return c}return-1}}var f=function() {e=[];for(var a=0;a<b.numOfCol;a++) {g("empty-"+a,a,0,1,-b.offsetY)}};var g=function(a,c,d,f,g) {for(var h=0;h<f;h++) {var i=new Object;i.x=c+h;i.size=f;i.endY=d+g+b.offsetY*2;e.push(i)}};var h=function(a,b) {for(var c=0;c<b;c++) {var d=i(a+c,"x");e.splice(d,1)}};var i=function(a,b) {for(var c=0;c<e.length;c++) {var d=e[c];if(b=="x"&&d.x==a) {return c}else if(b=="endY"&&d.endY==a) {return c}}};var j=function(a,b) {var c=[];for(var d=0;d<b;d++) {c.push(e[i(a+d,"x")].endY)}var f=Math.min.apply(Math,c);var g=Math.max.apply(Math,c);return[f,g,c.indexOf(f)]};var k=function(a) {if(a>1) {var b=e.length-a;var c=false;var d,f;for(var g=0;g<e.length;g++) {var h=e[g];var i=h.x;if(i>=0&&i<=b) {var k=j(i,a);if(!c) {c=true;d=k;f=i}else{if(k[1]<d[1]) {d=k;f=i}}}}return[f,d[1]]}else{d=j(0,e.length);return[d[2],d[0]]}};var l=function(a,c) {if(!a.data("size")||a.data("size")<0) {a.data("size",1)}else if(a.data("size")>b.numOfCol) {a.data("size",b.numOfCol)}var e=k(a.data("size"));var f=d*a.data("size")-(a.outerWidth()-a.width());a.css({width:f-b.offsetX*2,left:e[0]*d,top:e[1],position:"absolute"});var i=a.outerHeight();h(e[0],a.data("size"));g(a.attr("id"),e[0],e[1],a.data("size"),i)};a.fn.BlocksIt=function(g) {if(g&&typeof g==="object") {a.extend(b,g)}c=a(this);d=c.width()/b.numOfCol;f();c.children(b.blockElement).each(function(b) {l(a(this),b)});var h=j(0,e.length);c.height(h[1]+b.offsetY);return this}})(jQuery)

//业务模块
;(function (W, P){
"use strict";
P = W[P] = {}
var R = P.r = {} // 路由函数的根对象
	, $content = $('<div id="content">')
	, $h1 = $('<h1>')
	, $title = $('title')
	, $body = $('body').prepend($content).prepend($h1)
	, RULE = {
    filter: '身份，年龄，班级，成绩，寝室，班职，校职，萌点'.split('，')			//参与过滤的属性
    , array: '萌点，班职，校职，人设'.split('，')			//可以多项的属性
		, showTable: [			//表格显示的行列模板
			{ 姓名: 3, 年龄: 1 }
			,{ 身高: 1, 体重: 1, 三围: 1, 寝室: 1}
			,{ 班级: 1, 成绩: 1, 班职: 2}
			, '校职 身材 穿着 容貌 特长 缺点 特点 性格 爱好 讨厌 背景 萌点'.split(' ')
		]
		, character: {			//特定属性的输出方法
			身份: function() { return this.info.身份 || '学生' }
			, 学生: function() { return this.info.身份 == '学生' }
			, 校方: function() { return this.info.身份 == '校方' }
			, 成绩: function() { return this.学生() ? (this.info.成绩 || '中') : null }
			, 年龄: function() {
				var age = this.info.年龄
				if(age)
					return age
				if(this.学生() && (age = this.info.年级))
					return (parseInt(age) + 15) + ''
			}
			, 班级: function() {
				var g, c
				if(this.学生() && (g = this.info.年级) && (c = this.info.班级))
					return g + '年' + c + '班'
				if(this.学生())
					return '无'
			}
			, 身高: function() { return this.info.身高 ? this.info.身高 + 'cm' : null }
			, 体重: function() { return this.info.体重 ? this.info.体重 + 'kg' : null }
		}
		, sortValue: {			//特定属性的排序方法
			班级: function(str) {
				if(!str == '无') return '0'
				str = str.replace(/(\d{1,})年(\d{1,}班)/g, function(str, d1, d2) { return padding(d1, 3) + padding(d2, 3); })
				return str
				function padding(str, length) {
					var arr = [str]
					for(var i = length - str.length; i > 0; i --) { arr.unshift(0) }
					return arr.join('')
				}
			}
			, 成绩: function(str) {
				return '' + ($.inArray(str, '差，中下，中，中上，优，学霸'.split('，')) + 1)
			}
		}
	}

//基础类	
P.Character = function() {			//角色对象的基础类
	//this.guid = P.Guid()
	this.info = {}
}
//根据基础类和学校角色属性生产出角色类
P.Character.Set = function(schoolKey, protos) {
	var F = function() {
			P.Character.call(this)
		}
		, _protos = {
			GetSchoolKey: function() { return schoolKey }
			, GetSchool: function() { return P.GetSchool(schoolKey) }
			, Get: function(key, callback) {
				var self = this, value = self.info[key]
				if(key) {
					if($.isFunction(callback)  && value)
						return callback.call(self, value)
					if(self[key])
						return self[key]()
					if(value)
						return value
				}
			}
		}
	$.extend(F.prototype, _protos, protos)
	return F
}

//
P.InitSchool = function() {

    var $temp = $('<div>').append($('noscript').text())
      , S = {}, reg = /\/(\d+)\.txt$/

    $temp.find('li').each(function() {
        var $this = $(this)
        , $a = $this.find('a')
        , key = $a.attr('href').match(reg)[1]
        S[key] = {
            name : $a.text()
            , description: $this.find('.description').html()
            , sealed : $this.hasClass('封印')
        }
    })
    
    W.S = S


  $.each(W.S, function(schoolKey, school) {
    $.each(RULE, function(ruleKey,rule) {
      var schoolRule = school[ruleKey]
      if(undefined === schoolRule)
        school[ruleKey] = rule
       else if ($.isFunction(schoolRule))
        school[ruleKey] = schoolRule(rule)
    })
  })
}

//
P.GetSchool = function(key) {
	return key ? W.S[key] : W.S
}
//角色排序
P.SortCharacter = function(characters, key) {
	key = key || '姓名'
	characters.sort(function(a, b) {
		return a.info[key].localeCompare(b.info[key])
	})
}


//全局统一标识符
P.Guid = function() {
	function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) }
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}
//尝试读取缓存
P.LoadCache = function(key, expaire) {
	var retval = { status: false }, time
	expaire = expaire || 12
	if(localStorage) {
		time = localStorage.getItem('ycTime'+ key)
		if(time && Math.floor(((new Date()).getTime() - parseInt(time)) / (3600 * 1000)) < expaire) {
			retval.status = true
			retval.data = localStorage.getItem('ycContent'+ key)
		}
	}
	return retval
}
//尝试写缓存
P.SaveCache = function(key, data) {
	if(localStorage) {
		localStorage.setItem('ycTime'+ key, (new Date()).getTime())
		localStorage.setItem('ycContent'+ key, data)
	}
}
//读取数据
P.GetCharacters = function(callback) {
	var schoolKey = P.currentSchoolKey, ls = P.LoadCache(schoolKey)
	if(ls.status) 
		convert(ls.data)
	else
		$.get( 'schools/' + schoolKey + '.txt?' + (new Date()).getTime(), function(data, status) {
			if(status == 'success') {
				P.SaveCache(schoolKey, data)
				convert(data)
			}
		})
	//将获取的文本数据转化为角色数组
	function convert(data) {
		var character, characters = [], reg = /^([^:：]+)[:：](.+)$/, school = P.GetSchool(schoolKey), klass = P.Character.Set(schoolKey ,school.character), index = 0
		$.each(data.split(/\n/), function(no, line) {
			line = $.trim(line)
			if(!line) 
				return
			var match = line.match(reg)
				, key = match[1]
				, value = match[2]
			if(key == '姓名') {
				character = new klass()
				character.index = index ++
				characters.push(character)
			}
			if(P.IsArrayKey(key, school))
				value = value.split(/[,，]/)
			character.info[key] = value
		})
		P.SortCharacter(characters)
		school.characters = characters
		callback()
	}
}


//根据过滤关键字对角色数组进行过滤
P.GetFilteredCharacters = function(filter, characters, school) {
	var i = 0
	return (!filter || filter.count == 0)
		? characters
		: $.grep(characters, function(character) {
			var retval = true
			$.each(filter, function(key, filterValue) {
				var isArrayKey = P.IsArrayKey(key, school)
				if(key == 'count' || (!filterValue) || (isArrayKey && filterValue.length == 0))
					return
				var value = character.Get(key)
				if(!value) {
					retval = false
					return false
				}
				if(isArrayKey) {
					value = '۞' + value.join('۞') + '۞'
					$.each(filterValue, function() {
						if(value.indexOf('۞' + this + '۞') == -1) {
							retval = false
							return false
						}
					})
				} else {
					if(value != filterValue) {
						retval = false
						return false
					}
				}
			})
			return retval
		})
}

//根据搜索关键字对角色数组进行过滤
P.GetSearchedCharacters = function(search, characters, school) {
	var characters = school.characters
	return search ? $.grep(characters, function(character) {
			var retval = false
			$.each(character.info, function(key, value) {
				if(P.IsArrayKey(key, school))
					value = value.join('۞')
				if(value.indexOf(search) != -1) {
					retval = true
					return false
				}
			})
			return retval
		}) : characters
}

//对角色数组进行关键字统计
P.Count = function(characters, school) {
	var retval = {}
	//先统计
	$.each(characters, function(index, character) {
		$.each(school.filter, function(index, key) {
			if(!key)
				return
			addUp(key, character.Get(key))
		})
	})

	//再排序
	$.each(retval, function(key, stats) {
		stats.values.sort(school.sortValue[key] ? function(a, b) {
			return school.sortValue[key](a).localeCompare(school.sortValue[key](b))
		} : function(a, b) {
			return a.localeCompare(b)
		})
	})
	
	//统计函数
	function addUp(key, value) {
		if(!value) return
		var stats = retval[key]
		if(!stats)
			stats = retval[key] = { values: [], counts: {} }
			
		if(P.IsArrayKey(key, school))
			$.each(value, function(index, val) { count(val) })
		else
			count(value)

		function count(value){
			insert(value, stats.values) ? stats.counts[value] = 1 : stats.counts[value] ++
		}
	}
	//不重复地插入
	function insert(value, array) {
		if($.inArray(value, array) == -1) {
			array.push(value)
			return true
		}
	}
	return retval
}

P.IsArrayKey = function(key, school) {
	return $.inArray(key, school.array) != -1
}


//构造页面
P.View = function(title, content, callback) {
	$h1.html(title)
	$title.text($h1.text())
	$content.off().empty().append(content)
	if($.isFunction(callback))
		callback()
}
//首页的内容
P.View.Home = function() {
	var retval = ''
	retval += '<ul id="schoolList">'
	$.each(P.GetSchool(), function(schoolKey, school) {
		retval = '<li' + (school.sealed ? ' class="sealed"' : '')  + '><h2>' + school.name + '<a href="http://tieba.baidu.com/p/' + schoolKey + '" rel="external"></a></h2><p>' + school.description + '</p><p><a href="#!school/' + schoolKey + '">角色汇总表</a></p></li>' + retval
	})
	retval += '</ul>'
	
	P.View('我们的宏北女高',  retval)
}
//学校页的内容
P.View.School = function(locally) {
	var school = P.GetSchool(P.currentSchoolKey)
	
	//检查数据是否需要载入
	school.characters ? callback() : P.GetCharacters(callback)
		
	function callback() {
		if(!locally) {
			P.searchedCharacters = P.GetSearchedCharacters(P.currentSearchlKey, school.characters, school)			//搜索关键字
			P.searchedCharactersStats = P.Count(P.searchedCharacters, school)			//统计
		}
		P.currentCharacters = P.GetFilteredCharacters(school.currentFilters, P.searchedCharacters, school)			//过滤关键字

		var retval = createnavi() + createstats() + createinfo() + createlist()
		P.View('《我们的宏北女高》（' + school.name + '）<a href="http://tieba.baidu.com/p/' + P.currentSchoolKey + '" rel="external"></a>', retval, P.View.SchoolBinding)
	}

	//构造导航内容
	function createnavi() {
		var retval = '<nav>导航：<a href="#">首页</a>'
		retval += '<label><input id="search" type="text" value="' + (P.currentSearchlKey || '') + '" /></label>'
		retval += '<label><input id="submit" type="submit" value="搜索" /></label>'
		retval += '<label><input id="clear" type="button" value="清除" /></label>'
		retval += '<label><input id="toggle" type="button" value="隐藏" /></label>'
		if(localStorage)
			retval += '<label><input id="reload" type="button" value="重载" /></label>'
		retval += '</nav>'
		return retval
	}

	//构造关键字列表
	function createstats() {
		var retval = '<div id="stats">'
		$.each(school.filter, function() {
			var key = this, stats = P.searchedCharactersStats[key], filter = school.currentFilters
			if(!stats)
				return
			retval += '<div><span>' + key + '</span>'
			$.each(stats.values, function() {
				retval += '<b title="' + stats.counts[this] + '" data-key="' + key + '" data-value="' + this + '">' + this + '</b>'
			})
			retval += '</div>'
		})
		retval += '</div>'
		return retval
	}

	//构造返回描述
	function createinfo() {
		var retval = '<p>目前显示角色 ' + P.currentCharacters.length + '/' + P.searchedCharacters.length + ' 个</p>'
		return retval
	}

	//构造角色列表
	function createlist() {
		var retval = '<ul id="list">'
		$.each(P.currentCharacters, function() {
			retval += '<li>'
			retval += P.View.ShowCharacter(this)
			retval += '</li>'
		})
		retval += '</ul>'
		return retval
	}
}
//学校页页面事件
P.View.SchoolBinding = function() {
	P.View.RanderKey()
	$content.on('click', 'b', function(e) {
			var $this = $(e.target)
			P.View.ToggleKey($this.data('key'), $this.text())
		})
		.on('click', '#submit', function() {
			Q.go(Q.lash.replace(/(school\/\d+).*/, '$1/' + $('#search').val()))
		})
		.on('keydown', '#search', function(event) {
			if(event.which == 13)
				Q.go(Q.lash.replace(/(school\/\d+).*/, '$1/' + $('#search').val()))
		})
		.on('click', '#clear', function() {
			delete P.GetSchool(P.currentSchoolKey).currentFilters
			delete P.currentSearchlKey
			Q.go('school/' + P.currentSchoolKey)
			P.View.School()
		})
		.on('click', '#reload', function() {
			localStorage.removeItem('ycTime'+ P.currentSchoolKey)
			delete P.GetSchool(P.currentSchoolKey).characters
			P.View.School()
		})
		.on('click', '#toggle', function() {
			var show = $('#toggle').val() == '显示'
			$('#toggle').val(show ? '隐藏' : '显示')
			$('#stats').toggle(show)
		})
	$(window).off().on('resize', function() { P.View.BlockIt() })
	P.View.BlockIt()
}
P.View.BlockIt = function() {
	var w = $(window).width()
	, c = 460
	,offset = 8
	,col = Math.floor((w - offset) / c)
	col = col || 1
	$('#list').width((c + offset) * col - offset)
	$('#list').BlocksIt({
		numOfCol: col,
		offsetX: offset,
		offsetY: offset,
		blockElement: 'li'
	});
}
P.View.RanderKey = function() {
	var school = P.GetSchool(P.currentSchoolKey), filter = school.currentFilters
	if(filter && filter.count > 0) {
		$.each(filter, function(key, value) {
			if(key == 'count')
				return
			if(P.IsArrayKey(key, school))
				$.each(value, function(index, value) {
					$('#stats b[data-key=' + key +'][data-value=' + value +']').addClass('filter')
				})
			else
				$('#stats b[data-key=' + key +'][data-value=' + value +']').addClass('filter')
			
		})
	}
}
P.View.ToggleKey = function(key, value) {
	var $e = $('#stats b[data-key=' + key +'][data-value=' + value +']'), $ee, className = 'filter', school = P.GetSchool(P.currentSchoolKey), filter = school.currentFilters, isArray = P.IsArrayKey(key, school), hasFilter = filter && filter[key] && (isArray ? $.inArray(value, filter[key]) != -1 : filter[key] == value)
	if(hasFilter) {
		$e.removeClass(className)
		filter.count --
		if(isArray)
			filter[key].splice($.inArray(value, filter[key]), 1)
		else
			delete filter[key]

	} else {
		if(!filter)
			filter = school.currentFilters = { count: 0 }
		if(isArray) {
			if(!filter[key])
				filter[key] = []
			filter[key].push(value)
			filter.count ++	
		} else {
			$ee = $('#stats b[data-key=' + key +']')
			if(!filter[key]) {
				filter.count ++
			} else {
				$ee.removeClass(className)
			}
			filter[key] = value
		}
		$e.addClass(className)
	}
	P.View.School(true)
}
P.View.ShowCharacter = function(character) {
	var school = character.GetSchool(), html = character.html
	if(!html) {
		var emptyRow = '<tr class="empty"><th></th><td></td><th></th><td></td><th></th><td></td><th></th><td></td></tr>'
		html = '<table class="card ' + character.身份() + '">' + emptyRow
		$.each(school.showTable, function() {
			var row = this, temp = ''
			if($.isArray(row)){
				$.each(row, function() {
					var key = this, value = get(key)
					temp = td(key, value, 4)
					if(value)
						html = html + '<tr>' + temp + '</tr>'
					
				})
				
			} else {
				var show = false
				$.each(row, function(key, colspan) {
					var value = get(key)
					temp += td(key, value, colspan)
					if(value)
						show = true
				})
				if(show)
					html = html + '<tr>' + temp + '</tr>'
			}
		})
		if(character.info.人设) {
            var temp = []
            $.each(character.info.人设, function(no, rs){
                temp.push('<a href="' + rs + '" rel="external">' + (no + 1) + '</a>')
            })
            html += '<tr class="rs">' + td('人设', temp.join(''), 4) + '</tr>'
		}
		html += emptyRow + '</table>'
		character.html = html
	}
	return html
	function get(key) {
		var value = character.Get(key, (key == '姓名') ? function() {
			return '<span>' + character.info.姓名 + '</span><a class="baiduid" href="http://tieba.baidu.com/home/main?un=' + character.info.账号 + '&ie=utf-8&fr=pb" rel="external">' + character.info.账号 + '</a>' + (character.info.原帖 ? ('<a class="post" href="https://tieba.baidu.com/p/4980624255?pid=' + character.info.原帖 + '#post_content_' + character.info.原帖 + '" rel="external">原帖</a>') : '')
		} : null)
		, isArray = $.isArray(value), isFilter = $.inArray(key, school.filter) != -1
		if(value) {
			if(isFilter)
				value = isArray ? $.map(value, function(value) { return warp(key, value) }) : warp(key, value)
				
			if(isArray) 
				value = value.join(isFilter? '' : '，')
			value = $.trim(value)
			
		}
		return value
	}
	function warp(key, value) {
		return value ? '<b data-key="' + key + '" data-value="' + value + '">' + value + '</b>' : false
	}
	function td(key, value, colspan) {
		key = key || ''
		value = value || ''
		colspan = (colspan || 1) * 2 - 1
		colspan = (colspan == 1) ? '' : ' colspan="' + colspan + '"'
		return '<th>' + key+ '</th><td' + colspan + '>' + value + '</td>';
	}
}


//简单路由

//首页
R.home = function() {
	//构造页面
	P.View.Home()
	
}

//学校页
R.school = function() {
	
	var args = Array.prototype.slice.call(arguments)
		, schoolKey = args[0] ? args.shift() : null		//读取学校编号
	
	if(schoolKey && P.GetSchool(schoolKey)) {			//判断存在性
		//写入公共属性
		P.currentSchoolKey = schoolKey
		P.currentSearchlKey = decodeURIComponent(args.shift() || '')
		P.View.School()			//构造页面
	} else {
		delete P.currentSchoolKey
		delete P.currentSearchlKey
		Q.go('main')
	}
}

R.reload

})(window, 'P')

//执行模块
$(function() {

var home = 'main', R = P.r

$('body').on('click', 'a[rel=external]', function(event){
    window.open(this.href)
    event.preventDefault()
})

	P.InitSchool()
	//设定路由
	Q
		.reg(home, R.home)
		.reg('school', R.school)
		
	//初始化首页路由
		.init({ index:home })
	


	
})
