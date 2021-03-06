import ProjectDrawerWrapper from '@/components/ProjectDrawerWrapper';
import useProject from '@/hooks/useProject';
import { CopyOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react'

export default (): React.ReactElement => {

  const {currProject, setCurrProject} = useProject();
  const getScriptText = (projectId: number, recordTime: number) => {
    const text = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"/><script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"></script><script>eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 0=[[]];c.d({p:e(o,l){6(l){0.k([]);6(0.m>z){0.B()}}y j=0[0.m-1];j.k(o)},w:1*x*u,v:[c.A()],});9.q=e(i,4){3 5=0.r((a,b)=>a.s(b));3 4=f.t+\'//\'+f.R+\':S/Q/O/P\';3 n=h.g({T:W,d:{4:4,X:i,5:h.g(5),V:7 U()}});3 2;6(9.8){2=7 8()}F{2=7 G("H.C")}2.D("E",4);2.L("M-N","I/J");2.K(n)};',60,60,'eventsMatrix||httpxml|var|url|events|if|new|XMLHttpRequest|window|||rrweb|record|function|location|stringify|JSON|msg|lastEvents|push|isCheckout|length|body|event|emit|onerror|reduce|concat|protocol|1000|plugins|checkoutEveryNms|60|const|${recordTime}|getRecordConsolePlugin|shift|XMLHTTP|open|post|else|ActiveXObject|Microsoft|application|json|send|setRequestHeader|Content|type|project|addRecord|api|hostname|8081|projectId|Date|date|${projectId}|message'.split('|'),0,{}))</script>`;
    return text.trim();
  }

  const [scriptText, setScriptText] = useState(getScriptText(currProject.id!, currProject.recordTime!));

  const copyScriptText = () => {
    copy(scriptText);
    message.success('ε€εΆζε');
  }

  return (
    <div>
      <ProjectDrawerWrapper
        type="edit"
        initialValues={currProject}
        onSuccess={project => {
          setCurrProject(project);
          setScriptText(getScriptText(project.id!, project.recordTime!));
        }}>
        <Button type="primary" ghost icon={<EditOutlined/>}>ηΌθΎι‘Ήη?</Button>
      </ProjectDrawerWrapper>
      <Descriptions style={{marginTop: 24}} colon={false} layout="vertical" column={1}>
        <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label="ι‘Ήη?εΎη"><Image style={{height: 135}} src={currProject.imageUrl}/></Descriptions.Item>
        <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label="ι‘Ήη?εη§°">{currProject.name}</Descriptions.Item>
        <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label="ι‘Ήη?ε°ε">{currProject.address}</Descriptions.Item>
        <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label="ι‘Ήη?ζθΏ°">{currProject.description}</Descriptions.Item>
        <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label={
          <>
            ζ’ιδ»£η οΌε€εΆθΏζ?΅δ»£η ε°ι‘Ήη?ηbodyδΈ­οΌ
            <Button style={{marginLeft: 300}} type="primary" ghost size="small" icon={<CopyOutlined/>} onClick={copyScriptText}>ε€εΆ</Button>
          </>
        }>
          <Input.TextArea style={{width: 640}} rows={10} value={scriptText}/>
        </Descriptions.Item>
        {currProject.id === 0 && (
          <Descriptions.Item labelStyle={{fontWeight: 'bold'}} label="θ§¦εζ₯ιοΌηΉε»ζι?θ§¦εζ₯ιοΌε¨θ?°ε½δΈ­ε―δ»₯ηε°ζζοΌ"><Button danger onClick={() => a.b = 1}>ηΉε»θ§¦ε</Button></Descriptions.Item>
        )}
      </Descriptions>
    </div>
  )
}
