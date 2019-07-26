;(function($){
	const $input = $('.todo-input');
	const $ul = $('.todo-wrap');
	$input.on('keydown',function(ev){
		if(ev.keyCode == 13){
			$.ajax({
				url:"/add",
				type:"post",
				dataType:"json",
				data:{
					task:$input.val()
				},
				success:function(result){
					//根据返回的数据做出相应的处理
					//成功的情况,生成对应的DOM节点插入页面
					//失败情况弹出失败消息
					// console.log(result);
					console.log(result.data.task);

					if(result.code == 0){
						/*
						const task = result.data.task;
						const newLi = document.createElement('li');
						newLi.innerHTML = task;
						newLi.classList.add('todo-item');
						$ul.append(newLi);
						*/
						const data = result.data;
						const $li = `<li class="todo-item" data-id="${data.id}">${data.task}</li>`;
						$ul.append($li);
						$input.val("");
					}else{
						alert(result.message);
					}
				}
			})
		}
	})
	$ul.on('click','li',function(){
		const $this=$(this);
		$.ajax({
			url:'/del',
			dataType:'json',
			data:{
				id:$this.data('id')
			},
			success:function(result){
				if(result.code == 0){
					$this.remove();
				}else{
					alert(result.message);
				}
			}
		})
	})
})(jQuery)