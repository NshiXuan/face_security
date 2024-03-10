import React, { useEffect, useRef, useState } from 'react'

import * as echarts from 'echarts';
import { getUserList } from '@/service/user';
import { TestUserList } from '@/data/user-data';
import { IUser } from '@/type';

type EChartsOption = echarts.EChartsOption;

export type SeriesData = {
  value: number
  name: string
}

function getOption(titleText: string, data: SeriesData[]): EChartsOption {
  return {
    title: {
      text: titleText,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data as any,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

const Home = function () {
  const cDom1 = useRef(null);
  const cDom2 = useRef(null);
  const cInstance1 = useRef<any>();
  const cInstance2 = useRef<any>();

  useEffect(() => {
    let allUsers: IUser[] = []
    getUserList().then(res => {
      if (res.data) {
        allUsers = [...TestUserList, ...res.data]
      } else {
        allUsers = [...TestUserList]
      }

      if (cDom1.current) {
        // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
        cInstance1.current = echarts.getInstanceByDom(cDom1.current);
        cInstance2.current = echarts.getInstanceByDom(cDom2.current!);
        const initChart = (instances: any[], doms: any[], options: any[]) => {
          for (let i = 0; i < instances.length; i++) {
            const instance = instances[i];
            const dom = doms[i];
            const option = options[i];
            if (!instance.current) {
              instance.current = echarts.init(dom.current, null, {
                renderer: 'svg',
              });
            }
            instance.current.setOption(option);
          }
        }

        const inUsers = allUsers.filter(item => item.is_login == 2)
        const outUsers = allUsers.filter(item => item.is_login == 1)
        initChart([cInstance1, cInstance2], [cDom1, cDom2], [
          getOption('离开或进入小区人数', [
            { value: inUsers.length, name: `离开小区人数（${inUsers.length}人）` },
            { value: outUsers.length, name: `进入小区人数（${outUsers.length}人）` },
          ]),
          getOption('离开或进入小区人数', [
            { value: inUsers.length, name: `离开小区人数（${inUsers.length}人）` },
            { value: outUsers.length, name: `进入小区人数（${outUsers.length}人）` },
          ])
        ])
      }
    })

    return () => {
      // 容器被销毁之后，销毁实例，避免内存泄漏
      cInstance1.current.dispose();
      cInstance2.current.dispose();
    };
  }, []);

  return (
    <div className='flex p-3 gap-5'>
      <div id="echart1" ref={cDom1} style={{ width: '40vw', height: '80vh' }} />
      <div id="echart2" ref={cDom2} style={{ width: '40vw', height: '80vh' }} />
    </div>
  )
}

export default Home

// 设置一个方便调试的name 可以不写 默认为组件名称
Home.displayName = 'Home'
