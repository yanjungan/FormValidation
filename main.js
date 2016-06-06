function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;//\x00-xff单字节，[^\x00-xff]表示双字节
}
function findStr(str,n){//循环比较str与n
	var tmp=0;
	for(var i=0;i<str.length;i++){
		if (str.charAt(i)==n) {
			tmp++;
		}
	}
	return tmp;
}
window.onload=function(){
	var allInput=document.getElementsByTagName('input');//取出input标签
	var oName=allInput[0];
	var pwd=allInput[1];
	var pwd2=allInput[2];
	var aP=document.getElementsByTagName('p');//取出p标签
	var name_msg=aP[0];
	var pwd_msg=aP[1];
	var pwd2_msg=aP[2];
	var count=document.getElementById('count');
	var allEm=document.getElementsByTagName('em');

	var name_length=0;//字符长度

	/*用户名输入验证框*/
	/*1.数字，字母（不区分大小写），汉字，下划线
	  2.5-25字符，推荐使用中文名
	  3.中文：\u4e00-\u9fa5
	*/
	var re=/[^\w\u4e00-\u9fa5]/g;

	/*用户名
	有三个动作：聚焦在输入框，输入框旁边会有文字提示，
	在输入框里输入文字的时候，下面会有提示几个字符，当离开输入框的时候，旁边会有文字提示
	*/
	oName.onfocus=function(){//聚焦
		name_msg.style.display="block";
		name_msg.innerHTML='<i class="ati"></i>5-25个字符，一个汉字为两个字符，推荐使用中文会员名</p>'
	}
	oName.onkeyup=function(){//在键盘上某个键被按下后松开时触发此事件的处理程序
		count.style.visibility="visible";//让其显示
		name_length=getLength(this.value);//this指的是oName
		count.innerHTML=name_length+"个字符";
		if (name_length==0) {   
			count.style.visibility="hidden";//让其隐藏
		}
	}
	oName.onblur=function(){//失去焦点的时候
		//含有非法字符
		var re=/[^\w\u4e00-\u9fa5]/g;
		if (re.test(this.value)) {
			name_msg.innerHTML='<i class="err"></i>含有非法字符!';//<i class="err"></i>就是前面的提示的图标
		}
		//不能为空
		else if(this.value==""){
			name_msg.innerHTML='<i class="err"></i>不能为空!';
		}
		//长度超过25个字符
		else if (name_length>25) {
			name_msg.innerHTML='<i class="err"></i>长度超过25个字符!';
		}
		//长度少于6个字符
		else if (name_length<6) {
			name_msg.innerHTML='<i class="err"></i>长度少于6个字符!';
		}
		//OK
		else{
			name_msg.innerHTML='<i class="ok"></i>OK!';
		}

	}

	//密码
	pwd.onfocus=function(){
		pwd_msg.style.display="block";
		pwd_msg.innerHTML='<i class="ati"></i>6-16个字符，请使用字母加数字或符号组合密码，不能单独使用数字，字母或符号'
	}

	pwd.onkeyup=function(){
		//大于5字符“中”
		if (this.value.length>5) {
			allEm[1].className="active";//激活
			pwd2.removeAttribute("disabled");//去掉输入框禁用属性
			pwd2_msg.style.display="block";
		}
		else{//针对小于5个字符的
			allEm[1].className="";
			pwd2.setAttribute("disabled","disabled");//注意这地方，有两个参数
			pwd2_msg.style.display="none";

		}

		//大于10字符“强”
		if (this.value.length>10) {
			allEm[2].className="active";//激活
		}
		else{//针对小于5个字符的
			allEm[2].className="";

		}

	}
	pwd.onblur=function(){
		var m=findStr(pwd.value,pwd.value[0]);//每输入一个字符都与第0个字符比较
		re_n=/[^\d]/g;//除数字以为的字符
		re_t=/[^a-zA-Z]/g;//除字母之外的字符
		//不能为空
		if (this.value=="") {
			pwd_msg.innerHTML='<i class="err"><i>不能为空！';
		}
		//不能用相同字符,如111111
		else if (m==this.value.length) {
			pwd_msg.innerHTML='<i class="err"><i>不能用相同字符！';	
		}
		//长度应为6-16个字符
		else if(this.value.length<6||this.value.length>16){
			pwd_msg.innerHTML='<i class="err"><i>长度应为6-16个字符！';	
		}
		//不能全为数字
		else if (!re_n.test(this.value)) {//!re_n.test(this.value)表示全为数字
			pwd_msg.innerHTML='<i class="err"><i>不能全为数字！';
		}
		//不能全为字母
		else if (!re_t.test(this.value)) {//!re_n.test(this.value)表示全为数字
			pwd_msg.innerHTML='<i class="err"><i>不能全为字母！';
		}
		//OK
		else{
			pwd_msg.innerHTML='<i class="ok"><i>OK！';
		}
	}
	//确认密码框
	pwd2.onblur=function(){
		if (this.value!=pwd.value) {
			pwd2_msg.innerHTML='<i class="err"><i>两次输入不一致！';
		}else{
			pwd2_msg.innerHTML='<i class="ok"><i>OK！';
		}
	}
}