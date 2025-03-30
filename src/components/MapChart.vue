<template>
  <div class="chart-container">
    <div ref="chartContainer" style="width:100%;height:100%;min-height:300px;border:1px soild rgba(255,255,255,0.3)"></div>
    <el-dialog 
      :visible.sync="dialogVisible" 
      title="放大显示" 
      :modal="false"
      @close="closeLargeChart" 
      :destroy-on-close="true"
      :close-on-click-modal="false" 
      :close-on-press-escape="false" 
      custom-class="pie-dialog"
      width="80%"
    >
      <div id="large-map" style="height: 600px;"></div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="closeLargeChart">关闭</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import europeJson from '../assets/europe.geojson'
import * as echarts from "echarts";
export default {
  name: 'MapChart',
  data() {
    return {
      mapLoaded: false,
      chart: null,
      largeChart: null,
      dialogVisible: false,
      countryNameMapping: {
        'Finland': '芬兰',
        'Sweden': '瑞典',
        'Netherlands': '荷兰',
        'France': '法国',
        'Spain': '西班牙',
        'Portugal': '葡萄牙',
        'Italy': '意大利'
      }
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      echarts.registerMap('europe', europeJson)
      this.mapLoaded = true
      this.initChart()
    }, { once: true })
  },
  methods: {
    initChart() {
      if (!this.mapLoaded) return
      this.chart = echarts.init(this.$refs.chartContainer)
      const data = [
        { name: 'Finland', value: 0.2651, chineseName: '芬兰' },
        { name: 'Sweden', value: 0.6721, chineseName: '瑞典' },
        { name: 'Netherlands', value: 0.7615, chineseName: '荷兰' },
        { name: 'France', value: 0.5017, chineseName: '法国' },
        { name: 'Spain', value: 0.1281, chineseName: '西班牙' },
        { name: 'Portugal', value: 0.8310, chineseName: '葡萄牙' },
        { name: 'Italy', value: 1.5708, chineseName: '意大利' },
        { name: 'Britain', value: 0.0524, chineseName: '英国' },
        { name: 'Lithuania', value: 0.1895, chineseName: '立陶宛' },
        { name: 'Poland', value: 0.8054, chineseName: '波兰' }
      ]

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: '#DAB278',
          borderColor: '#DAB278',
          textStyle: {
            color: '#fff'
          },
          formatter: params => {
            if (!params.data || !params.data.value) return;
            return `${params.data.chineseName}/${params.name}<br/>${params.data.value}`;
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 2,
          inRange: {
            color: ['#DAB278', '#EFC472', '#F5D48B']
          }
        },
        geo: {
          map: 'europe',
          zoom: 1.5,
          center: [15, 52],
          roam: false,
          itemStyle: {
            areaColor: 'transparent',
            borderColor: '#DAB278',
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              areaColor: '#DAB278'
            }
          },
          label: {
            show: false
          }
        },
        series: [{
          type: 'map',
          map: 'europe',
          roam: false,
          zoom: 1.5,
          center: [15, 52],
          label: {
            show: true,
            formatter: params => {
              if (params.data && params.data.value) {
                return [
                  `{cn|${params.data.chineseName}/${params.name}}`,
                  `{value|${params.data.value}}`
                ].join('\n');
              }
              return '';
            },
            rich: {
              cn: {
                fontSize: 12,
                color: this.$store.state.app.isLightMode ? '#333333' : '#ffffff',
                padding: [2, 0],
                fontWeight: this.$store.state.app.isLightMode ? 'bold' : 'normal'
              },
              value: {
                fontSize: 12,
                color: this.$store.state.app.isLightMode ? '#333333' : '#ffffff',
                padding: [2, 0],
                fontWeight: this.$store.state.app.isLightMode ? 'bold' : 'normal'
              }
            }
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: '#DAB278',
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              areaColor: '#DAB278'
            }
          },
          data: data
        }]
      }
      
      this.chart.setOption(option)
      
      setTimeout(() => {
        this.chart.resize()
      }, 100)
      
      const resizeHandler = () => this.chart.resize()
      window.addEventListener('resize', resizeHandler)
      
      this.chart.on('click', () => {
        this.handleChartClick()
      })
      
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeHandler)
        window.removeEventListener('load', this.initChart)
        this.chart.dispose()
      })
    },
    handleChartClick() {
      this.dialogVisible = true
    },
    closeLargeChart() {
      this.dialogVisible = false
      if (this.largeChart) {
        this.largeChart.dispose()
      }
    }
  },
  watch: {
    dialogVisible(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          const largeChartElement = document.getElementById("large-map")
          if (largeChartElement) {
            this.largeChart = echarts.init(largeChartElement)
            this.largeChart.setOption(this.chart.getOption())
          }
        })
      }
    },
    '$store.state.app.isLightMode': {
      handler() {
        if (this.chart) {
          this.initChart()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-container > div {
  width: 100%;
  height: 100%;
}

.dv-border-box-7 {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
}

#chartContainer {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  min-height: 400px;
}

#large-map {
  width: 100%;
  height: 600px;
}

:deep(.el-dialog__wrapper) {
  background-color: rgba(0, 0, 0, 0.3);
}

:deep(.pie-dialog) {
  background-color: #1b1b1b;
  border: 1px solid #0E4C8F;
}

:deep(.pie-dialog .el-dialog__header) {
  background-color: #1b1b1b;
  color: #fff;
  border-bottom: 1px solid #0E4C8F;
}

:deep(.pie-dialog .el-dialog__title) {
  color: #fff;
}

:deep(.pie-dialog .el-dialog__body) {
  background-color: #1b1b1b;
  padding: 20px;
}

:deep(.pie-dialog .el-dialog__footer) {
  background-color: #1b1b1b;
  border-top: 1px solid #0E4C8F;
}

:deep(.pie-dialog .el-button) {
  background-color: #0E4C8F;
  border-color: #0E4C8F;
  color: #fff;
}

:deep(.pie-dialog .el-button:hover) {
  background-color: #1a5ca0;
  border-color: #1a5ca0;
}
</style>