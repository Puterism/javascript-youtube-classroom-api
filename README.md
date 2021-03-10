# javascript-youtube-classroom-api

우아한테크코스 나만의 유튜브 강의실 미션 수행용

[여기서 사용합니다](https://github.com/Puterism/javascript-youtube-classroom)


## 사용 방법

### 로컬 환경에서

1. `git clone`을 합니다.
2. `.env` 파일을 프로젝트 폴더의 root에 생성하고 `YOUTUBE_API_KEY=<API 키를 여기에 입력합니다>`를 작성하고 저장합니다.
3. `yarn`을 하고 `yarn global add nodemon` 혹은 `yarn add nodemon`을 합니다.
4. `yarn start`를 하면 서버가 열립니다.
5. `localhost:8080`으로 요청합니다.


## API

### `/search`

검색어로 유튜브 동영상을 검색한다. 한 번에 10개까지씩 보여준다.

#### query

- `q`
  - 검색어

- `pageToken`
  - API 요청 후 받은 `prevPageToken`이나 `nextPageToken` 값을 넣어서 호출하는 식으로 Pagination 가능

#### Example
```
/search/?q=무야호&pageToken=OIRWqA
```

### `/search/dummy`

검색어가 `무야호` 일 때만 더미 데이터 기반의 결과 10개를 반환한다.

- `q`
  - 검색어

#### Example
```
/search/dummy?q=무야호
```

### `/videos`

유튜브 동영상 ID에 해당하는 동영상 데이터를 불러온다.

#### query

- `id`
  - 검색할 id String을 `id,id,id,...` 형태로 입력.

#### Example
```
/videos?id=JsYMtNXDO1I,hluEw50uVIw
```

### 결과 반환 형태

```
{
  "success": Boolean,
  "data": Object (유튜브 API로 호출한 response.data를 그대로 반환)
}
```
