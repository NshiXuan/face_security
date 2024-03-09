import React, { useEffect, useRef } from 'react'

import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

const Home = function () {
  const cDom1 = useRef(null);
  const cDom2 = useRef(null);
  const cInstance1 = useRef<any>();
  const cInstance2 = useRef<any>();
  const option1: EChartsOption = {
    title: {
      text: '离开或进入小区人数',
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
        data: [
          { value: 1048, name: '离开小区人数' },
          { value: 735, name: '进入小区人数' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const option2: EChartsOption = {
    title: {
      text: '小区人数与陌生人人数',
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
        data: [
          { value: 1048, name: '小区人数' },
          { value: 100, name: '陌生人人数' },
        ],
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
  useEffect(() => {
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
      initChart([cInstance1, cInstance2], [cDom1, cDom2], [option1, option2])
    }

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
