import React, { useState } from 'react';
import './SignUpPage.css';
import NavBar from '../MainPage/MainComponent/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrow_drop_down_icon from '../Icon/arrow_drop_down.png';
import arrow_drop_up_icon from '../Icon/arrow_drop_up.png';

const SignUpPage = ({ authenticate, setAuthenticate }) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    email: '',
    job: '',
    jobKeyword: '',
    isAbove15: false,
    privacyPolicyAccepted: false,
    recordingAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [jobKeywordList, setJobKeywordList] = useState([]);
  const [selectedJob, setSelectedJob] = useState('희망 직무');
  const [selectedJobKeyword, setSelectedJobKeyword] = useState('직무 키워드');
  const [showJob, setShowJob] = useState(false);
  const [showJobKeyword, setShowJobKeyword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const jobList = ["기획·전략", "마케팅·홍보·조사", "회계·세무·재무", "인사·노무·HRD", "총무·법무·사무", "IT개발·데이터", "디자인", "영업·판매·무역", "고객상담·TM", "구매·자재·물류", "상품기획·MD", "운전·운송·배송", "서비스", "생산", "건설·건축", "의료", "연구·R&D", "교육", "미디어·문화·스포츠", "금융·보험", "공공·복지"];

  // 사용자 등록을 위한 API 호출
  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/members', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => { // 경고문구가 출력된 상태에서 입력란에 값을 입력 시 경고문구 사라짐
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    // 각 필드별 유효성 검사
    if (name === 'name') {
      if (value.length === 0) {
        setErrors({ ...errors, name: '이름을 입력해주세요' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    }

    if (name === 'id') {
      if (value.length === 0 || !/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/.test(value)) {
        setErrors({ ...errors, id: '조합이 일치하지 않습니다' });
      } else {
        setErrors({ ...errors, id: '' });
        setIdCheckMessage('');
      }
    }

    if (name === 'password') {
      if (!/^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(value)) {
        setErrors({ ...errors, password: '조합이 일치하지 않습니다' });
      } else {
        setErrors({ ...errors, password: '' });
      }
    }

    if (name === 'email') {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        setErrors({ ...errors, email: '이메일 형식이 아닙니다' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (type === 'checkbox') {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.id) newErrors.id = '아이디를 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    if (selectedJob === '희망 직무') newErrors.job = '희망 직무를 선택해주세요';
    if (selectedJobKeyword === '직무 키워드') newErrors.jobKeyword = '직무 키워드를 선택해주세요';
    if (!formData.isAbove15) newErrors.isAbove15 = '만 15세 이상임을 확인해주세요';
    if (!formData.privacyPolicyAccepted) newErrors.privacyPolicyAccepted = '개인정보 수집 및 이용에 동의해주세요';
    if (!formData.recordingAccepted) newErrors.recordingAccepted = 'AI모의면접 진행 시 목소리 녹음에 동의해주세요';
    if (!idCheckMessage || isDuplicate) newErrors.idCheck = '아이디 중복 확인을 해주세요';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          name: formData.name,
          id: formData.id,
          password: formData.password,
          email: formData.email,
          job: formData.job,
          jobKeyword: formData.jobKeyword,
          isAbove15: formData.isAbove15,
          privacyPolicyAccepted: formData.privacyPolicyAccepted,
          recordingAccepted: formData.recordingAccepted,
        };

        const result = await registerUser(userData);
        console.log('회원가입 성공:', result);
        setShowConfirmation(true);
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
    }
  };

  // 아이디 중복 확인
  const checkDuplicateId = async () => {

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,20}$/.test(formData.id)) {
      setIdCheckMessage('올바른 형식으로 ID를 입력해주세요');
      setIsDuplicate(true);
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/api/members/checkUserId?id=${formData.id}`);
        if (response.data) {
          setIdCheckMessage('이미 등록된 아이디입니다');
          setIsDuplicate(true);
        } else {
          setIdCheckMessage('사용가능한 아이디입니다');
          setIsDuplicate(false);
        }
      } catch (error) {
        console.error('중복 확인 에러:', error);
        setIdCheckMessage('중복 확인 중 오류가 발생했습니다');
        setIsDuplicate(true);
      }
    }
    setErrors({ ...errors, idCheck: '' });
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const toggleJob = () => {
    setShowJob(!showJob);
    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };
  
  const selectJob = async (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, job });
    setShowJob(false);
    // 직무키워드 엔드포인트
    // try {
    //   const response = await axios.get(`http://localhost:8080/api/job-postings/job-names?jobMidName=${job}`);
    //   setJobKeywordList(response.data);
    // } catch (error) {
    //   console.error('직무 키워드 로드 에러:', error);
    // }
    if (job === "기획·전략") {setJobKeywordList(["리스크 관리","경영관리","CSO","CIO","기획","게임기획","경영분석","경영기획","경영컨설팅","광고기획","경영혁신(PI)","교육기획","금융컨설팅","레벨디자인","기술기획","리서치","마케팅기획","데이터분석","문화기획","사업개발","법인장","사업관리","브랜드기획","사업제휴","사업기획","상품기획","스토리보드","서비스기획","시장조사","신사업기획","앱기획","신사업발굴","웹기획","실적관리","인사기획","엑셀러레이팅","전략기획","예산관리","지점관리자","인큐베이팅","출판기획","컨설턴트","자료조사","행사기획","조직관리","CEO","지속가능경영","COO","창업컨설팅","CTO","타당성검토","IT컨설팅","투자전략","PL(프로젝트리더)","트렌드분석","프로토타이핑","PM(프로젝트매니저)","해외법인관리","PMO","BPR","PO(프로덕트오너)","BSC","CSR","ESG","ISMP","ISP","KPI관리","M&A","MBO","OKR","RFP(제안요청서)","UI/UX"])}
    if (job === "마케팅·홍보·조사") {setJobKeywordList(["라이센싱","PPL","CBO","홍보","마케팅","병원마케팅","검색광고","마케팅기획","광고주관리","마케팅전략","광고캠페인","블로그마케팅","그로스해킹","매체관리","스포츠마케팅","배너광고","인플루언서마케팅","비딩","체험마케팅","행사기획","사보/뉴스레터","사회조사","SNS마케팅","설문조사","콘텐츠기획","광고마케팅","세일즈프로모션","광고PD","시장조사","언론홍보","글로벌마케팅","옥외광고","기업홍보","이벤트프로모션","디지털마케팅","모바일마케팅","채널관리","키워드광고","미디어플래너","통계/분석","바이럴마케팅","브랜드마케팅","퍼블리시티","비즈니스마케팅","ATL","오프라인마케팅","BTL","온라인마케팅","IMC","제휴마케팅","MCN","MICE","조사원","RFP(제안요청서)","콘텐츠마케팅","SEO","콘텐츠에디터","퍼포먼스마케팅","프로덕트마케팅","AD(아트디렉터)","AE(광고기획자)","AM(어카운트매니저)","B2B마케팅","BM(브랜드매니저)","CD(크리에이티브디렉터)","CMO","CRM마케팅","CW(카피라이터)","MW(메디컬라이터)"])}
    if (job === "회계·세무·재무") {setJobKeywordList(["행정사","재무","회계","더존","감사","관세법인","경리","4대보험","세관","세무법인","경리사무원","계산서발행","세무사사무실","공인회계사","관리회계","해외법인","관세사","급여(Payroll)","회계법인","관세사무원","기업회계","내부감사","회계사무실","세무사","법인결산","전산회계","법인세신고","회계사","부가세신고","AICPA","세무기장","CFA","세무신고","CFO","세무조정","IR/공시","KICPA","세무컨설팅","세무회계","손익관리","신고대리","연결회계","연말정산","예산관리","외부감사","외환관리","원가관리","원가회계","원천세신고","자금관리","자산관리","자산운용","자체기장","재무기획","재무제표","재무회계","전표입력","종합소득세","채권관리","출납","회계결산","ERP","IFRS","IPO","NDR"])}
    if (job === "인사·노무·HRD") {setJobKeywordList(["인사","노무사","급여(Payroll)","채용담당자","면접/인터뷰","잡매니저","법정의무교육","직업상담사","복리후생","헤드헌터","실적관리","아웃소싱","ER(노무관리)","HR컨설팅","온보딩","HRD","인력관리","인사교육","HRM","인사기획","인사행정","인재발굴","임금협상","제증명발급","조직문화","직업훈련","채용공고관리","채용대행","채용설명회","파견관리","평가/보상"])}
    if (job === "총무·법무·사무") {setJobKeywordList(["법무","법무사","교육행정","변리사","기술사업화","변호사","내방객응대","비서","문서작성","사내변호사","비품관리","사무직","사내행사","서무","사무보조","사무행정","송무비서","법률사무원","사이트관리","수행기사","상표관리","수행비서","서류관리","안내데스크","시설관리","임원비서","인/허가","총무","자료입력","컴플라이언스","자료조사","자산관리","특허명세사","전산총무","전화응대","제증명발급","콘텐츠관리","타이핑","특허관리","특허분석","특허컨설팅","Excel","IP(지식재산권)","OA","PhotoShop","PowerPoint","정보처리","경영지원"])}
    if (job === "IT개발·데이터") {setJobKeywordList(["SQA","보안관제","BI 엔지니어","개발PM","데이터 사이언티스트","헬스케어","메타버스","클라이언트","HTTP","암호화폐","MMORPG","Dapp","DID","크로스플랫폼","루비온레일즈","풀스택","Solidity","스마트컨트랙트","게임개발","검색엔진",".NET","기술지원","네트워크","그누보드","데이터분석가","데이터라벨링","라즈베리파이","데이터엔지니어","데이터마이닝","쉘스크립트","백엔드/서버개발","데이터시각화","액션스크립트","보안컨설팅","딥러닝","어셈블리","앱개발","머신러닝","와이어샤크","웹개발","모델링","파워빌더","웹마스터","모의해킹","ABAP","유지보수","미들웨어","AIX","정보보안","반응형웹","Ajax","퍼블리셔","방화벽","Android","프론트엔드","블록체인","Angular","CISO","빅데이터","Apache","CPO","빌링","ArcGIS","DBA","솔루션","ASP","FAE","스크립트","ASP.NET","GM(게임운영)","신경망","AWS","IT컨설팅","악성코드","Azure","QA/테스터","알고리즘","Bootstrap","SE(시스템엔지니어)","영상처리","C#","SI개발","웹표준·웹접근성","C++","ICT컨설팅","음성인식","C언어","이미지프로세싱","CentOS","인프라","COBOL","임베디드","CSS","자율주행","CSS3","정보통신","Delphi","챗봇","Directx","취약점진단","Django","컴퓨터비전","Docker","크로스브라우징","Eclipse","크롤링","ECMAScript","클라우드","ElasticStack","텍스트마이닝","Flask","트러블슈팅","FLEX","펌웨어","Flutter","플러그인","GCP","핀테크","Git","API","GoLang","APM","GraphQL","AR(증강현실)","Groovy","DBMS","Gulp","DevOps","Hadoop","DLP","HBase","DW","HTML","ERP","HTML5","ETL","IaaS","FPGA","iBATIS","GIS","Ionic","H/W","iOS","IDC","Java","IIS","Javascript","IoT","Jenkins","ISMS","JPA","MCU","jQuery","Nginx","JSP","NLP(자연어처리)","Kafka","NLU(자연어이해)","Keras","OCR","Kotlin","OLAP","Kubernetes","RDBMS","LabVIEW","RPA","Linux","RTOS","Logstash","S/W","Lucene","SAP","MacOS","SDK","MariaDB","SOA","Matlab","STT","Maven","TTS","MFC","UTM","MongoDB","VDI","MSSQL","VMware","MyBatis","VoIP","MySQL","VPN","Node.js","VR(가상현실)","NoSQL","WCF","Objective-C","아키텍쳐","OpenCV","AI(인공지능)","OpenGL","Windows","OracleDB","인터페이스","OSS","PaaS","Pandas","Perl","PHP","PL/SQL","PostgreSQL","Pro-C","Python","Pytorch","QGIS","Qt","R","React","React-Native","ReactJS","Redis","Redux","RestAPI","Ruby","SaaS","SAS","Scala","Servlet","Solaris","Spark","Splunk","Spring","SpringBoot","SQL","SQLite","Storm","Struts","SVN","Swift","Sybase","Tensorflow","Tomcat","TypeScript","Ubuntu","Unity","Unix","Unreal","VB.NET","Verilog","Vert.x","VisualBasic","VisualC·C++","Vue.js","WAS","WebGL","Webpack","WebRTC","WPF","XML","아두이노","임베디드리눅스"])}
    if (job === "디자인") {setJobKeywordList(["인테리어","가구디자인","2D디자인","3DMax","건축디자인","3D디자인","드림위버","게임디자인","가방","라이노","경관디자인","간판","베가스","공간디자인","남성의류","스케치업","공공디자인","니트","애프터이펙트","데님","인디자인","공예디자인","도트/픽셀아트","일러스트","광고디자인","드로잉","지브러쉬","그래픽디자인","라이팅","코렐드로우","그림작가","렌더링","파이널컷","디지털디자인","리플렛","프리미어","로고디자인","만화/웹툰","플래시","모바일디자인","명함","Blender","무대디자인","모델링","CAD","문구디자인","모션그래픽","Cinema4D","배너디자인","보정/리터칭","Figma","북디자인","브로슈어","FLEX","브랜드디자인","삽화","HTML","산업디자인","상세페이지","Keyshot","섬유디자인","색보정","Maya","시각디자인","샘플링","PhotoShop","실내디자인","속옷","QuarkXpress","애니메이터","스포츠의류","Sketch","앱디자인","신발","Substance","영상디자인","썸네일","TexPro","완구디자인","아동복","Unity","웹디자인","아트워크","Unreal","의상디자인","어셋","V-Ray","일러스트레이터","여성의류","XD","자동차디자인","옥외광고","Zeplin","잡화디자인","우븐","전시디자인","원화","정보디자인","이모티콘","인포그래픽","조명디자인","자막","주얼리디자인","작화","캐릭터디자인","잡지","컨셉디자인","제안서","컬러리스트","조형물","콘텐츠디자인","주방용품","패브릭디자인","채색","패키지디자인","카드뉴스","패턴디자인","카탈로그","편집디자인","캘리그라피","폰트디자인","컨셉아트","표지디자인","타이포그래피","프로모션디자인","템플릿","환경디자인","팜플렛","AD(아트디렉터)","페인팅","VMD","포스터","BI디자인","프랍","BX디자인","피규어","CI디자인","합성","UI/UX디자인","현수막","홈패션/홈데코","홍보물","CG","DTP","GUI","POP","SIGN","VFX"])}
    if (job === "영업·판매·무역") {setJobKeywordList(["영업","영업기획","보안솔루션영업","관세사","B2B","관세사무원","B2C","국제무역사","가맹점관리","기술영업","가맹점영업","무역경리","거래처관리","무역사무원","거래처납품","무역중개인","거래처영업","무역MR","고객관리","보세사","공공영업","샵마스터","관세환급","영업관리","기업영업","영업지원","렌탈영업","영업직","마트영업","영업MD","매장관리","원산지관리사","매체영업","자동차딜러","매출관리","캐셔","무역거래","판매직","무역영어","포워더","바이어발굴/관리","가구판매","백화점영업","가전판매","벤더관리","건강식품판매","부품수출","건설영업","쇼핑몰관리","광고영업","수/발주","귀금속판매","수출입","기계판매","실적관리","네트워크영업","아울렛영업","방문판매","여행사영업","부동산영업","온라인영업","상조영업","유통영업","솔루션기술영업","장기렌트영업","시스템영업","점포개발","식품/음료영업","정산관리","식품/음료판매","주문관리","영업마케팅","진열관리","영업전략","통관","영업판촉","학원영업","온라인판매","해외영업관리","의료기기영업","해외영업지원","의류무역","핸드폰영업","의류판매","홈쇼핑영업","자동차영업","FTA","자재판매","H/W","잡화판매","LC(신용장)","장비영업","S/W","정육판매","제약영업","주류영업","주류판매","축산물판매","컴퓨터판매","타이어판매","통신기기판매","티켓판매","항공무역","해상무역","해외시장개척","해외영업","핸드폰판매","호텔영업","화장품영업","화장품판매","IT영업","SI영업","증권영업"])}
    if (job === "고객상담·TM") {setJobKeywordList(["게시판관리","상담원","고객관리","아웃바운드","이미지컨설턴트","교육상담","인바운드","교환/반품","텔레마케터","기술상담","CS","단순안내","CX매니저","대출상담","섭외TM","메일상담","민원상담","방문상담","배송상담","상담품질관리","원격상담","전화상담","접수/예약","주문상담","채팅상담","콜센터/고객센터","콜통계/분석","통화품질분석","해지방어","해피콜","A/S상담","VOC분석"])}
    if (job === "구매·자재·물류") {setJobKeywordList(["구매","품질관리","3PL운영","구매관리","물류관리","개발구매","물류사무원","거래처관리","보세사","검품/검수","견적관리","자재관리","구매대행/소싱","재고관리","납기관리","창고관리","물류자동화","포워더","배차관리","구매기획","보세구역관리","국제물류","물류기획","보세화물관리","유통관리","상하차","SRM","선적","수/발주","SCM","수급관리","수불관리","양산구매","외자구매","외주관리","원가관리","입고/입하","자재구매","적재/하역","전략구매","정산관리","조달구매","집하/분류","출고/출하","패킹(포장)","피킹(집품)","화물관리","ERP","MRO","WMS"])}
    if (job === "상품기획·MD") {setJobKeywordList(["식품MD","패션MD","기획MD","가공식품","리테일MD","가구","바잉MD","건강기능식품","브랜드MD","결품관리","슈퍼바이저","구매총괄","영업MD","남성의류","오프라인MD","납기관리","온라인MD","로드샵","리빙","유통MD","AMD","매출관리","면세점","VMD","문구","백화점","브랜드관리","브랜드기획","브랜드런칭","브랜드확장","브랜딩","상품관리","상품분석","생활용품","소셜커머스","쇼핑몰","스포츠용품","스포츠의류","시장조사","시판","식품","아동복","아이템선정","여성의류","영캐주얼","오픈마켓","완구","유아용품","이커머스","자사몰관리","전자제품","제작관리","주방","주얼리/액세서리","채널관리","트렌드분석","판매전략","팝업스토어관리","패션브랜드","패션잡화","퍼니싱","편집샵","프로모션기획","홈쇼핑","홈패션/홈데코","화장품","회원분석","CS관리","POP","SNS","SRM"])}
    if (job === "운전·운송·배송") {setJobKeywordList(["운전","1톤","덤프트럭","납품운전원","대리운전","2.5톤","로우더","3.5톤","믹서트럭(레미콘)","라이더(배달원)","물류기사","4.5톤","암롤","배송기사","5톤이상","전동지게차","버스기사","소형화물","지게차","보세운송","견인차","집게차","사택기사","선박","컨테이너크레인","오토바이","크레인","셔틀버스기사","수행기사","윙바디","포크레인(굴삭기)","호이스트","화물차(카고)","승합기사","조종사","탑차","지상조업","탱크로리","차량도우미","트럭","퀵서비스","트레일러","특수차량","탁송기사","택배기사","택시기사","포워더","포장이사","육상운송","적재/하역","지입","철도운송","통관","항공운송","해상운송","배차관리","선적"])}
    if (job === "서비스") {setJobKeywordList(["요리사","영양사","파티쉐","매장관리","청소","자동차정비","시설관리","피부관리사","객실관리","공항","가사도우미","고객안내","관리사무소","검침원","고객응대","급식소","경비원","광택","네일샵","경비지도사","기계수리","대형마트","경호원","다이어트","드레스샵","관광가이드","동물관리","리조트","관광통역안내사","동물장례","미용실","나레이터","라운딩","백화점","네일리스트","렌탈","서점","두피관리사","마사지","식당","라이더(배달원)","메이크업","에스테틱/스파","룸메이드","면세품인도","여객선","매장매니저","발권","여행사","매표/검표","방범","영화관","미용사","설비점검","웨딩스튜디오","미화원","세탁","웨딩홀","바리스타","소독","장례식장","바텐더","속눈썹","주방","발레파킹","식단관리","주유소","벨멘/도어맨","썬팅","카지노","보안요원","요금정산","카페","부주방장","의류수선","콘도","뷰티매니저","인터넷설치","키즈카페","산후도우미","자동차도장","항공사","세차원","자동차튜닝","호텔","소믈리에","접수/예약","스타일리스트","출력/제본/복사","승무원","케이터링","아쿠아리스트","펜션관리","안내데스크","프론트","안전요원","필터교체","양조사","해충방제","왁서","현금호송","웨딩플래너","LPG충전","육아도우미","입주도우미","장례지도사","정비기사","제과/제빵사","조리사","주방보조","주방장","주유원","주차요원","지배인","지상직","차량도우미","체형관리사","카페매니저","캐셔","커뮤니티매니저","커플매니저","탁송기사","테라피스트","프로모터","플로리스트","하우스맨","해설가","행사도우미","호텔리어","홀매니저","홀서빙","A/S기사","가전제품설치","애견미용","애견훈련","파티플래너","푸드스타일리스트","GRO(컨시어지)","보석감정사"])}
    if (job === "생산") {setJobKeywordList(["품질관리","생산","생산기술","공정관리","제조","항공정비","공장장","포장","품질보증","자동차","식품","기계조작원","2D설계","3축가공기","2교대","단순생산직","3D설계","5축가공기","3교대","미싱사","3차원측정","감속기","상주근무","생산관리","계측기교정","고속가공기","야간근무","설비OP","공구연마","라우터","일용직","세공사","공구연삭","레디알","입식근무","외관검사원","광학/렌즈","범용밀링","좌식근무","용접원","그라비아인쇄","범용보링","주간근무","재단사","금속","범용선반","제관사","납땜","변압기","조색사","다이캐스팅","복합기","품질검사원","도장/도금/도색","성형기","QA","드릴링","세륜기","QC","레이저가공","압출기","공정엔지니어","목형","연마기","기술엔지니어","바닥재","연삭기","설계엔지니어","박스제조","자동선반","캐드원","박판용접","절곡기","PSM","방적/방사","지그","공정설계","방전가공","천공기","제품설계","배관용접","톱기계","구조해석/설계","배합","파쇄기/분쇄기","금형설계","불량분석","프레스","기계설계","브러쉬","CAM","기구설계","비금속/요업","MCT","기술설계","사상/래핑","NC/CNC밀링","부품설계","사출금형","NC/CNC보링","생산설계","사출성형","NC/CNC선반","시스템설계","샌딩","NCT","계장설계","석유화학","PLC","전장설계","선박엔진","안전보건관리자","섬유/의류","자동화설계","세척밸리데이션","장비설계","실링","전기설계","실크인쇄","펌프설계","아노다이징","조선설계","아크릴가공","프로그램설계","아크용접","플랜트설계","알곤용접","회로설계","압연","절단가공","압출성형","절삭가공","에칭","자동제어","열처리","장비제어","와이어컷팅","전기제어","인발","전자제어","인서트","반도체설계","자동용접","제조가공","자동화라인","작물재배","장비/공구","전계장","전기용접","제련","제약/바이오","조립","주얼리/액세서리","주조/단조","증착","충진","칭량","코팅","터닝","판금","패션잡화","펀칭","편조","평면연마","평면연삭","포밍","프레스금형","합형","후가공","BBT","Co2용접","CVD","ERP","FPCB","Haccp","LCD","LED","MES","PCB","PVC","PVD","SMT","농업","도료/페인트","계측제어","도면해독","디스플레이","메카트로닉스","목재","반도체","생산자동화","설계보조","스마트팩토리","에너지관리","열해석","유동해석","펌웨어","품질분석","플라스틱","항공기","화공약품","화장품","ASIC","AUTOSAR","BLU","EDA","FA(공장자동화)","FPGA","H/W","HMI","MEMS","OLED","S/W","SMPS","마스터캠","솔리드엣지","솔리드웍스","인벤터","파워밀","하이퍼밀","Altium","AutoCAD","CAD","CATIA","Creo(Pro-E)","NX(UG)","OrCAD","Pads","PSpice","Sputter","Tribon","Verilog","VHDL"])}
    if (job === "건설·건축") {setJobKeywordList(["분전반","용접부","빌트인","작업반장","산업설비","전기기사","산업플랜트","제관사","상/하수도","중개보조원","샵드로잉","취부사","석공사","캐드원","석면조사","토목기술자","석재","토양환경기사","설비보수","폐기물처리기사","소방/방재","현장관리자","소음/진동","현장기사","수장공사","환경관리자","수치해석","CM(건설사업관리)","시설관리","QA","실내건축시공","QC","실내공기질측정","전산/기술직","아크용접","설계엔지니어","아파트건축","안전보건관리자","에폭시","건축구조설계","엘리베이터","산림설계","열교환기","토목설계","영선","통신설계","옹벽","환경설계","욕실","2D설계","위생설비","3D설계","위험성평가","내진설계","유리시공","도시설계","인테리어공사","배관설계","자동문","배전반설계","자동제어","설계보조","작업환경측정","소방설계","잡철","수자원설계","전계장","전기설계","전기설비","조경설계","전기시공","조경공사","차선도색","창호/샤시","철골공사","철근콘크리트","측량/계측","친환경건축","커튼월","컬러링","케이블설치","타일시공","토목건축","토목공사","토목공학","통신공사","파이프","판넬시공","폐수처리장관리","플랜트건설","플랜트설비","플랜트전기","플랜트토목","플레이트","필름시공","하자보수","하자진단","하천","해양조사","홈인테리어","화학플랜트","환경분석","환경영향평가","환경플랜트","BIM","CCTV공사","에너지관리","전기제어","지역개발","HVAC","3DMax","스케치업","Abaqus","AutoCAD","TEKLA","건축설계","지역개발컨설팅","방사선안전관리","계전기","가스기능사","가스설비","광파기","감리원","간판시공","용접기","감정평가사","강구조","천공기","건물관리자","건설관리","크레인","건설견적원","건설노무","트윈모션","건설경리","건조설비","CAD","건축가","건축설비","Navisworks","건축기사","건축전기","Revit","검침원","경량철골","공무","골조","공인중개사","공조설비","공조냉동기사","관급공사","기계기사","교량/가설","기술도해사","굴착","기전기사","그라우팅","내선전공","단열","다기능공","대기측정분석","대기환경기사","덕트","도장공","도배/벽지","목공","도시가스","방수공","도시개발","배관공","도시교통","보건관리자","리모델링","보일러기사","마감재","보조공","마루","분양상담사","미장","비파괴검사원","바닥재","산림기사","반송설비","수질환경기사","방음/방벽","시공관리자","벌목","시공기사","부대토목","신호수","부동산","안전관리자"])}
    if (job === "의료") {setJobKeywordList(["보험심사청구사","간병인","기능검사","가정의학과","내시경실","2교대","치과위생사","구급차기사","드레싱보조","감염내과","호스피스","3교대","간호사","두피관리사","모발이식","구강내과","회복실","당직","놀이치료사","병동보호사","방문간호","구강외과","신생아실","D-Keep","도수치료사","병원경리","병원경영","내과","응급실","D/E","마취간호사","병원총무","병원관리","내분비내과","인공신장실","D/N","물리치료사","병원행정사","보건진단","대장항문외과","중환자실","E-Keep","미술치료사","병원코디네이터","수술","마취통증의학과","처치실","E/N","방사선사","보건관리자","수술보조","병리과","주사실","N-Keep","산업간호사","비만관리사","스포츠마사지","비뇨기과","촬영실","S-Keep","상담간호사","상담실장","외래","산부인과","개인병원","수간호사","심리운동사","원무","성형외과","검진센터","수의사","약국전산원","의료영상","소아과","노인전문병원","수의테크니션","영양사","의약사무","소화기내과","대학병원","심리치료사","요양보호사","임상시험","순환기내과","동물병원","심사간호사","운동처방사","입원관리","신경외과","보건소","약사","위생사","접수/예약","신장내과","비만클리닉","언어치료사","응급구조사","제약QA","안과","산후조리원","운동치료사","보건의료정보관리사","조제보조","알레르기내과","심혈관센터","음악치료사","의지보조기기사","진료보조","약제과","아동병원","의공기사","정신과보호사","채혈","영상의학과","암센터","의사","MR","처방","외과","약국","인지치료사","침구실보조","이비인후과","여성병원","임상병리사","행동치료","재활의학과","여성의원","임상심리사","환자안내","정신과","요양병원","작업치료사","환자이송","정형외과","일반병원","재활치료사","RA","직업환경의학과","재활센터","전공의","조직병리","진단검사의학과","정신병원","전문의","치과","종합병원","책임간호사","통증의학과","주야간보호센터","청능사/청각사","피부과","척추병원","초음파사","한방과","치과병원","치기공사","핵의학과","치과의원","한약사","혈액종양내과","한방병원","한의사","호흡기내과","한의원","CRA(임상연구원)","흉부외과","혈액원","CRC(연구간호사)","CRM(임상연구전문가)","QPS간호사","안경사","간호조무사"])}
    if (job === "연구·R&D") {setJobKeywordList(["반도체","대기측정분석사","고분자","로봇엔지니어","광학설계","연구원","기술연구","기후변화","인증심사원","농업","임상DM","임상PM","도료/페인트","임상STAT","동물실험","환경측정분석사","로봇설계","CRA(임상연구원)","메뉴개발","CRC(연구간호사)","무인항공기/드론","CRM(임상연구전문가)","미생물","R&D","바이러스","분자진단","R&D기획","생명과학","세포배양","세포실험","수질분석","시료분석","시료채취","식품연구","신소재","신재생에너지","실험보조","알고리즘개발","원자력","유기합성","유전자","유해화학물질","의료기기연구","의약외품연구","이미지프로세싱","이화학시험","임상개발","임상시험","자율주행","전자파","정책연구","제약/바이오","제제연구","제형연구","줄기세포","토양환경","학술연구","환경오염","AI(인공지능)","FT-IR분석"])}
    if (job === "교육") {setJobKeywordList(["국어","공부방교사","교구수업","간호학원","게임개발","과외","기업교육","검정고시학원","경제","교관","동화구연","고등학교","공연예술","교육컨설턴트","미대입시","공무원학원","과학","교직원","수능강의","국제학교","기술가정","대학강사","영어교재","유아놀이학원","네일아트","돌봄교사","온라인교육","대안학교","논술/글쓰기","바리스타강사","요양보호사교육","대학교","농구","방문교사","유아교육","대학원","댄스","보건강사","이러닝","도서관","도덕","보육교사","인성교육","문화센터","디자인","보조강사","인큐베이팅","미용학원","만화/웹툰","상담교사","입시컨설팅","방과후학교","메이크업","원어민강사","진로상담","보습학원","메카트로닉스","입학사정관","체대입시","복지시설","미술","조교","쿠킹클래스","상담센터","발레","청소년지도사","학생지도","속셈학원","생활체육","코치","학습상담","승무원학원","세계사","특수교사","학습지","아동센터","수영","파트강사","학원생관리","어린이집/유치원","수학","퍼포먼스강사","LMS","어학원","스피치","학습매니저","유아영어학원","애니메이션","학원강사","요리학원","연극","학원보조","운전학원","영어","훈련교사","유학원","윤리","CS강사","입시학원","물리","IT강사","중학교","생물","교수설계","직업전문학교","한국사","교육운영","초등학교","사회","교육컨텐츠개발","음악","교육컨텐츠기획","일본어","교재개발","전산회계","방과후교사","정보보호교육","평생교육사","제2외국어","직업훈련","중국어","컴퓨터교육","지구과학","지리","코딩","태권도","피아노","한국어","한문","화학","CG"])}
    if (job === "미디어·문화·스포츠") {setJobKeywordList(["작곡","가수","골프","기술감독","공연기획","기자","공연예술","도슨트","교열","리포터","국악","방송BJ","나레이션","사운드엔지니어","농구","선수","뉴미디어","성우","당구","쇼호스트","댄스","스크립터","레저","스포츠강사","레크레이션","스포츠에이전트","모델에이전시","아나운서","무대제작","기상캐스터","문화재","에디터","뮤지컬","연예매니저","미디어플래너","영상디자이너","미술관","영화감독","바이올린","인플루언서","박물관","작가","발레","재활치료사","방송송출","촬영감독","배구","캐디","배드민턴","컬러리스트","보정/리터칭","코치","보조출연","큐레이터","보컬레슨","크리에이터","복싱","테크니컬라이터","볼링","통/번역","생활체육","트레이너","수영","패션모델","순수미술","포토그래퍼","스토리텔링","프리뷰어","승마","피팅모델","실용음악학원","해설가","애니메이션","AD(아트디렉터)","야구","AE(광고기획자)","에어로빅","CW(카피라이터)","엔터테인먼트","DJ","영상자막","FC(피트니스카운셀러)","영상제작","MC","영상편집","PD/AD/FD","영어","VJ","요가","영화기획","원고작성","영화미술","음악회","영화제작","음원","음반기획","인제스트/인코딩","음반유통","일본어","캐스팅매니저","재즈","방송엔지니어","제2외국어","조명","중국어","첼로","촬영","촬영보조","축구","콘서트","크로스핏","태권도","테마파크","편성","포스트프로덕션","피아노","필라테스","합창","헬스","A&R","e-Sports","VOD서비스","드라마","라이브커머스","만화/웹툰","신문","영화","유튜브","잡지","CF광고","TV"])}
    if (job === "금융·보험") {setJobKeywordList(["공제기관","기업금융","대출상담사","보험설계사","사금융권","기업분석","손해사정사","생명보험사","기업심사","선물중개회사","심사역","담보대출","애널리스트","대출심사","손해보험사","텔러","배상","일반은행","자산운용사","배상책임","펀드매니저","제2금융권","보험사고","금융사무","보험청구","증권사","금융상품영업","투자자문사","부동산투자","보험상담","특수은행","손해보험","보험상품개발","저축은행","보험심사","손해평가","신탁","여신심사","외환관리","위험관리","위험분석","자산운용","재무분석","재물손해사정","주식영업","주식투자","채권관리","채권추심","투자검토","투자분석","투자심사","투자자문","투자자산","펀드","환전","DCM","ECM","NPL","PF영업"])}
    if (job === "공공·복지") {setJobKeywordList(["가족상담","캠페이너","도서관사서","노인복지","놀이치료","평생교육사","도서관리","돌봄교사","미술치료","보호상담원","사무국장","방과후아카데미","목회자","방문목욕","방문요양","사무직","사례관리","사회복지사","아동보육","생활복지사","아동복지","생활지도원","생활지원사","음악치료","심리치료사","인지치료","요양보호사","자원봉사","작업치료","임기제공무원","장애인복지","군인·부사관","청소년복지","병역특례","호스피스","재활교사","EAP상담","직업상담사","MARC구축","청소년지도사","특수교사","활동지원사","감각통합치료사","언어치료사"])}

    if (errors.job) {
      setErrors({ ...errors, job: '' });
    }
  };

  const toggleJobKeyword = () => {
    if (selectedJob !== '희망 직무') {
      setShowJobKeyword(!showJobKeyword);
    }
    if (errors.jobKeyword) {
      setErrors({ ...errors, jobKeyword: '' });
    }
  };

  const selectJobKeyword = (jobKeyword) => {
    setSelectedJobKeyword(jobKeyword);
    setFormData({ ...formData, jobKeyword });
    setShowJobKeyword(false);
    if (errors.jobKeyword) {
      setErrors({ ...errors, jobKeyword: '' });
    }
  };

  return (
      <div className="SignUpPage">
        <div className="SignUpPage-sign-up">
          <div className="SignUpPage-content">
            <form className="SignUpPage-frame" onSubmit={handleSubmit}>
              <div className="SignUpPage-div">
                <div className="SignUpPage-frame-2">
                  <div className="SignUpPage-text-field">
                    <div className="SignUpPage-label-wrapper">
                      <div className="SignUpPage-label">이름(실명)</div>
                    </div>
                    <input className={`SignUpPage-text-field-2 ${errors.name ? 'SignUpPage-error' : ''}`}
                           type="text"
                           name="name"
                           value={formData.name}
                           placeholder='이름 입력'
                           onChange={handleChange}
                    />
                    {errors.name && <p className="SignUpPage-error-message">{errors.name}</p>}
                  </div>
                  <div className="SignUpPage-text-field">
                    <div className="SignUpPage-label-wrapper">
                      <div className="SignUpPage-label">아이디</div>
                    </div>
                    <div className="SignUpPage-frame-3">
                      <input className={`SignUpPage-text-field-3 ${isDuplicate ? 'SignUpPage-duplicate' : ''} ${errors.id ? 'SignUpPage-error' : ''}`}
                             type="text"
                             name="id"
                             value={formData.id}
                             placeholder='4~20자리 / 영문, 숫자 조합'
                             onChange={handleChange}
                      />
                      <div className="SignUpPage-div-wrapper">
                        <button type="button" onClick={checkDuplicateId} className="SignUpPage-text-wrapper">중복 확인</button>
                      </div>
                    </div>
                    {idCheckMessage && <p className={`SignUpPage-id-check-message ${isDuplicate ? 'SignUpPage-duplicate' : 'SignUpPage-available'}`}>{idCheckMessage}</p>}
                    {errors.id && <p className="SignUpPage-error-message">{errors.id}</p>}
                    {errors.idCheck && <p className="SignUpPage-error-message">{errors.idCheck}</p>}
                  </div>
                  <div className="SignUpPage-text-field">
                    <div className="SignUpPage-label-wrapper">
                      <div className="SignUpPage-label">비밀번호</div>
                    </div>
                    <input className={`SignUpPage-text-field-2 ${errors.password ? 'SignUpPage-error' : ''}`}
                           type="password"
                           name="password"
                           value={formData.password}
                           placeholder='8~16자리 / 대소문자, 숫자, 특수문자 조합'
                           onChange={handleChange}
                    />
                    {errors.password && <p className="SignUpPage-error-message">{errors.password}</p>}
                  </div>
                  <div className="SignUpPage-text-field">
                    <div className="SignUpPage-label-wrapper">
                      <div className="SignUpPage-label">이메일</div>
                    </div>
                    <div className="SignUpPage-frame-3">
                      <input className={`SignUpPage-text-field-6 ${errors.email ? 'SignUpPage-error' : ''}`}
                             type="email"
                             name="email"
                             value={formData.email}
                             placeholder='chichipokpok@gmail.com'
                             onChange={handleChange}
                      />
                    </div>
                    {errors.email && <p className="SignUpPage-error-message">{errors.email}</p>}
                  </div>
                </div>
                <img
                    className="SignUpPage-line"
                    alt="Line"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
                />
                <div className="SignUpPage-frame-4">
                  <div className="SignUpPage-text-field-4">
                    <div className="SignUpPage-frame-5">
                      <div className="SignUpPage-text-field-wrapper">
                        <div className={`SignUpPage-text-field-5 ${errors.job ? 'SignUpPage-error' : ''}`} onClick={toggleJob}>
                          <div className="SignUpPage-text-wrapper-2">{selectedJob}</div>
                          <img
                              className={showJob ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                              alt={showJob ? "Arrow drop up" : "Arrow drop down"}
                              src={showJob ? arrow_drop_up_icon : arrow_drop_down_icon}
                          />
                        </div>
                        {showJob && (
                            <div className="SignUpPage-frame-6">
                              {jobList.map((job, index) => (
                                  <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJob(job)}>
                                    {job}
                                  </div>
                              ))}
                            </div>
                        )}
                        {errors.job && <p className="SignUpPage-error-message">{errors.job}</p>}
                      </div>
                      <div className="SignUpPage-text-field-wrapper">
                        <div className={`SignUpPage-text-field-5 ${errors.jobKeyword ? 'SignUpPage-error' : ''}`} onClick={toggleJobKeyword}>
                          <div className="SignUpPage-text-wrapper-2">{selectedJobKeyword}</div>
                          <img
                              className={showJobKeyword ? "SignUpPage-arrow-drop-up" : "SignUpPage-arrow-drop-down"}
                              alt={showJobKeyword ? "Arrow drop up" : "Arrow drop down"}
                              src={showJobKeyword ? "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668ccfaca48cce45c95d9d30/img/arrow-drop-up@2x.png" : "https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/arrow-drop-down@2x.png"}
                          />
                        </div>
                        {showJobKeyword && (
                            <div className="SignUpPage-frame-6">
                              {jobKeywordList.map((jobKeyword, index) => (
                                  <div key={index} className="SignUpPage-text-wrapper-3" onClick={() => selectJobKeyword(jobKeyword)}>
                                    {jobKeyword}
                                  </div>
                              ))}
                            </div>
                        )}
                        {errors.jobKeyword && <p className="SignUpPage-error-message">{errors.jobKeyword}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                    className="SignUpPage-line"
                    alt="Line"
                    src="https://cdn.animaapp.com/projects/666f9293d0304f0ceff1aa2f/releases/668681f71fc2293e52abea39/img/line-3.svg"
                />
              </div>
              <div className="SignUpPage-frame-7">
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> 만 15세 이상입니다</span>
                  </p>
                  <input
                      type="checkbox"
                      name="isAbove15"
                      checked={formData.isAbove15}
                      onChange={handleChange}
                  />
                </div>
                {errors.isAbove15 && <p className="SignUpPage-error-message-2">{errors.isAbove15}</p>}
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> 개인정보 수집 및 이용 동의</span>
                  </p>
                  <input
                      type="checkbox"
                      name="privacyPolicyAccepted"
                      checked={formData.privacyPolicyAccepted}
                      onChange={handleChange}
                  />
                </div>
                {errors.privacyPolicyAccepted && <p className="SignUpPage-error-message-2">{errors.privacyPolicyAccepted}</p>}
                <div className="SignUpPage-check-box">
                  <p className="SignUpPage-p">
                    <span className="SignUpPage-span">[필수]</span>
                    <span className="SignUpPage-text-wrapper-4"> AI모의면접 진행 시 귀하의 목소리가 녹음됩니다.</span>
                  </p>
                  <input
                      type="checkbox"
                      name="recordingAccepted"
                      checked={formData.recordingAccepted}
                      onChange={handleChange}
                  />
                </div>
                {errors.recordingAccepted && <p className="SignUpPage-error-message-2">{errors.recordingAccepted}</p>}
              </div>
              <div className="SignUpPage-frame-8">
                <button type="submit" className="SignUpPage-frame-9">
                  <div className="SignUpPage-text-wrapper-5">회원가입</div>
                </button>
                <p className="SignUpPage-div-2">
                  <span className="SignUpPage-text-wrapper-4">이미 가입된 회원이신가요? </span>
                  <button className="SignUpPage-text-wrapper-6" onClick={goToLogin}>로그인</button>
                </p>
              </div>
            </form>
          </div>
        </div>
        <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />
        {showConfirmation && (
            <div className="SignUpPage-confirmation-overlay">
              <div className="SignUpPage-confirmation-box">
                <div className="SignUpPage-frame-10">
                  <div className="SignUpPage-text-wrapper-7">회원가입 완료</div>
                  <p className="SignUpPage-text-wrapper-8">
                    치치폭폭 회원이 되셨습니다!
                    <br />
                    환영합니다^^
                  </p>
                  <div className="SignUpPage-frame-11">
                    <div className="SignUpPage-frame-12" onClick={() => { setShowConfirmation(false); goToLogin();}}>
                      <div className="SignUpPage-text-wrapper-9">로그인 이동</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default SignUpPage;