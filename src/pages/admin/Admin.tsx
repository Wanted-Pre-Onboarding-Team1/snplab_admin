import React, { MouseEvent, useState } from 'react';
import { CSVLink } from 'react-csv';
import {
  BsChevronLeft as PreviousPageIcon,
  BsChevronRight as NexstPageIcon,
} from 'react-icons/bs';
import { CSV_HEADER } from 'libs/utils/constants';
import TabBox from './components/TabBox';
import useAdminLoad from './hook/useAdminLoad';
import SearchSelectBox from './components/SearchSelectBox';

export default function Admin() {
  const [searchKey, setSearchKey] = useState<string>('name');
  const [searchValue, setSearchValue] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [currentTab, setCurrentTab] = useState('1차');
  const onChangeTab = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.value);
  };
  const {
    data: membersData,
    isError: isMembersError,
    isLoading: isMemberLoading,
  } = useAdminLoad(currentTab, pageNo, searchKey, searchValue);

  const getSearchKey = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchKey(event.target.value);
  };

  const getSearchValue = (value: string) => {
    setSearchValue(value);
  };

  if (isMembersError) return <div>에러</div>;
  if (isMemberLoading) return <div>로딩중</div>;
  return (
    <div>
      <header>
        <p className="pl-3 pt-3 h-9 bg-black text-white font-bold">메인</p>
      </header>
      <h1 className="font-bold text-xl ml-20 mt-3 mb-3">
        학습용 교통 데이터 수집을 위한 크라우드 워커 지원 현황
      </h1>
      <section className="flex flex-col items-center">
        <div className="flex justify-between w-11/12">
          <div>
            <SearchSelectBox
              searchKey={searchKey}
              getSearchKey={getSearchKey}
              searchValue={searchValue}
              getSearchValue={getSearchValue}
            />
          </div>
          <div>
            <CSVLink
              className="w-32 h-10 bg-gray-300 rounded-md"
              data={membersData}
              headers={CSV_HEADER}
              filename="SNPLab 지원자 리스트"
            >
              <button
                type="button"
                className="w-32 h-10 bg-gray-300 rounded-md"
              >
                액셀 다운로드
              </button>
            </CSVLink>
          </div>
        </div>
        <section className="w-11/12 h-screen bg-gray-200 mt-5 mb-5 flex flex-col justify-between">
          <TabBox
            onChangeTab={onChangeTab}
            membersData={membersData}
            currentTab={currentTab}
          />
          <div className="flex justify-center w-full content-end pb-12">
            <div className="flex items-center text-2xl">
              <button
                type="button"
                className="text-gray-600 hover:scale-150 ease-in duration-100"
                onClick={() => setPageNo(pageNo - 1)}
              >
                <PreviousPageIcon />
              </button>
              {Array.from({ length: 10 }, (_v, k) => k + 1).map((num) => (
                <button
                  type="button"
                  key={`page_nation_${num}`}
                  className={`${
                    pageNo === num ? 'text-sky-700' : 'text-gray-400'
                  } text-lg px-2 mx-0.5 border-solid border-2 rounded-lg bg-zinc-50  cursor-pointer hover:translate-y-[-4px] hover:text-sky-700 ease-in duration-100`}
                  onClick={() => setPageNo(num)}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                className="text-gray-600 hover:scale-150 ease-in duration-100"
                onClick={() => setPageNo(pageNo + 1)}
              >
                <NexstPageIcon />
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
