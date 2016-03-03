;(function (W){
"use strict";
	W.S = // 学校数据的根对象
{
	4218080466: {
		name: '宏北女子高中'
		, description: '充满各种奇怪少女的日常学园。贴吧群：宏北中学后宫群（1493892695）；QQ群：宏北高中（532520398）。'
		, filter: '身份，年龄，班级，成绩，寝室，班职，校职，萌点'.split('，')			//参与过滤的属性
		, array: '萌点，班职，校职'.split('，')			//可以多项的属性
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
}
})(window)
