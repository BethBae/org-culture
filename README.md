# 우리 조직문화 진단 — Vercel 배포 가이드

## 화면 주소
| 용도 | 주소 |
|---|---|
| 참여자 응답 (QR로 배포) | https://내프로젝트.vercel.app |
| 강사용 실시간 결과 (빔 화면) | https://내프로젝트.vercel.app/?view=admin |
| 참여자용 결과 보기 | https://내프로젝트.vercel.app/?view=result |
| 다른 기관에서 재사용 | 주소 뒤에 ?s=기관코드 (예: ?s=eunhye , ?s=eunhye&view=admin) |

## 배포 순서 (약 10분)
1. 이 폴더를 GitHub 저장소에 올립니다. (index.html, api 폴더, README.md)
2. Vercel 대시보드 → Add New → Project → 저장소 선택 → Framework Preset은 "Other" → Deploy
3. 배포된 프로젝트 → Storage 탭 → Marketplace에서 "Upstash" (Redis) 선택 → Free 플랜으로 생성 → 이 프로젝트에 Connect
   - 연결되면 KV_REST_API_URL, KV_REST_API_TOKEN 환경변수가 자동으로 추가됩니다.
4. Settings → Environment Variables → ADMIN_PIN 추가 (초기화 버튼용 숫자, 예: 1004)
5. Deployments → 최신 배포의 ⋯ → Redeploy (환경변수 반영)
6. /?view=admin 을 열어 QR이 보이면 완료

CLI로 배포할 경우: 폴더에서 `npx vercel` → `npx vercel --prod` (저장소 연결과 환경변수는 위 3~4번과 동일)

## 수업 당일 체크리스트
- [ ] 수업 시작 전 강사 화면에서 "초기화"로 테스트 응답 삭제
- [ ] 와이파이 또는 모바일 데이터 사용 가능 여부 확인
- [ ] 응답 5명 미만이면 결과가 잠겨 있음 (익명성 보호). 필요 시 강사 화면 "결과 공개"
- [ ] 수업 후 "CSV 저장"으로 원자료 보관 → 응답은 30일 후 자동 삭제

## 익명성 설계
- 이름·직위·근속·IP·응답 시각을 저장하지 않습니다.
- 결과는 평균과 긍정응답률(4~5점 비율)로만 표시합니다.
- 개방형 응답은 무작위 순서로 섞어 보여 줍니다.
- 한 기기에서 중복 제출을 막습니다(같은 기기에서 다시 응답하려면 주소 끝에 ?again).

## 문항 출처
- 조직문화 유형: Cameron & Quinn 경쟁가치모형(CVF) 4유형을 1문항씩 간이 측정하도록 변형
- 심리적 안전감: Edmondson(1999) 7문항 의역, 1·3·5번 역문항
- 소통·슈퍼비전: 아동복지시설 맥락 자체 개발 6문항
