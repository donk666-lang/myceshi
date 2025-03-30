<template>
  <div class="dashboard" :class="{ 'light-mode': isLightMode }">
    <!-- 顶部筛选区域 -->
    <div class="filter-section">
      <div class="filter-item">
        <div class="filter-header" style="width:230px">
          <div class="title">Membership Country</div>
          <div class="subtitle">成员国家</div>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.a"
            placeholder="Membership Country"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in countryOptions"
              :key="item.value"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <div class="filter-header" style="width:250px">
          <span class="title">Declaration by B</span>
          <span class="subtitle">是否由B申报WEEE</span>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.b"
            placeholder="Declaration by B"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in declarationOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="filter-item" style="width:320px">
        <div class="filter-header">
          <span class="title">Declaration Periods</span>
          <span class="subtitle">申报期</span>
        </div>
        <div class="filter-content">
          <el-date-picker
            v-model="sreachForm.c"
            type="daterange"
            range-separator="-"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          >
          </el-date-picker>
        </div>
      </div>

      <div class="filter-item logo-item">
        <div class="logo-container" @click="toggleTheme">
          <img
            v-if="isLightMode"
            src="../assets/bai.jpg"
            alt="Honda Logo"
            class="honda-logo"
            style="border: 1px solid rgba(255, 255, 255, 0.3)"
          />
          <img
            v-else
            src="../assets/hei.png"
            alt="Honda Logo"
            class="honda-logo"
            style="border: 1px solid rgba(255, 255, 255, 0.3)"
          />
        </div>
      </div>

      <div class="filter-item">
        <div class="filter-header">
          <span class="title">Sales Mode</span>
          <span class="subtitle">销售模式</span>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.d"
            placeholder="Sales Mode"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in modeOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <div class="filter-header">
          <span class="title">Customer</span>
          <span class="subtitle">客户</span>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.e"
            placeholder="Customer"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in customerOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <div class="filter-header">
          <span class="title">Proposer</span>
          <span class="subtitle">申请人</span>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.f"
            placeholder="Proposer"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in proposerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <div class="filter-header">
          <span class="title">PV Model No.</span>
          <span class="subtitle">组件型号</span>
        </div>
        <div class="filter-content">
          <el-select
            v-model="sreachForm.g"
            placeholder="PV Model No."
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- 数据指标区域 -->
    <div class="metrics-section">
      <div class="metric-item">
        <div class="metric-header">
          <!-- <span class="currency"></span> -->
          <div class="title">Total WEEE FEE</div>
          <div class="subtitle">WEEE总成本</div>
        </div>
        <div class="zonghe">
          <div class="metric-value">{{totalData}}</div>
          <div class="bizhong">
            <div
              v-for="currency in currencies"
              :key="currency.symbol"
              @click="getCurrency(currency.symbol)"
              class="currency-symbol"
              :class="{
                'active-currency': currentCurrency === currency.symbol,
              }"
            >
              {{ currency.symbol }}
            </div>
          </div>
        </div>
      </div>

      <div class="metric-item">
        <div class="metric-header">
          <div class="title">WEEE FEE/Wp</div>
          <div class="subtitle">WEEE单瓦成本</div>
        </div>
        <div class="metric-value">¥{{ fee }}</div>
      </div>

      <div class="metric-item">
        <div class="metric-header">
          <div class="title">Total Watt Peak(Wp)</div>
          <div class="subtitle">总瓦数</div>
        </div>
        <div class="metric-value">{{totalFee}}</div>
      </div>

      <div class="metric-item">
        <div class="metric-header">
          <div class="title">Total Weight(kg)</div>
          <div class="subtitle">总重量(千克)</div>
        </div>
        <div class="metric-value">{{weight}}</div>
      </div>

      <div class="metric-item">
        <div class="metric-header">
          <span class="title" style="width:125px">Total Shipping Quantity(pieces)</span>
          <span class="subtitle">总发货量(件)</span>
        </div>
        <div class="metric-value">{{number}}</div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <!-- 折线图 -->
      <div
        class="chart-container line-chart"
        @click="showChartDialog('line', '折线图', 'lineMain')"
      >
        <div class="chart-header">
          <span class="title">折线图</span>
          <span class="subtitle">Testzxt</span>
        </div>
        <div class="chart-content">
          <div id="lineMain" style="width: 100%; height: 300px"></div>
        </div>
      </div>

      <!-- 地图 -->
      <div
        class="chart-container map-chart"
      >
        <div class="chart-content">
          <map-chart class="chart" style="width:100%;height:321px" />
        </div>
      </div>

      <!-- 曲线图 -->
      <div
        class="chart-container curve-chart"
        @click="showChartDialog('curve', '曲线图', 'zheLineMain')"
      >
        <div class="chart-header">
          <span class="title">曲线图</span>
          <span class="subtitle">Testqxt</span>
        </div>
        <div class="chart-content">
          <div id="zheLineMain" style="width: 100%; height: 300px"></div>
        </div>
      </div>
      <div class="bottomList">
        <!-- 数据输入 -->
        <div class="chart-container data-input">
          <div class="chart-header1">
            <span class="title">Data Input</span>
            <span class="subtitle">数据输入</span>
          </div>
          <div class="chart-content centered-content">
            <div class="big-percentage">85%</div>
          </div>
        </div>

        <!-- 占比 -->
        <div
          class="chart-container pie-chart"
          @click="showChartDialog('pie', '占比', 'pieChart1')"
        >
          <div class="chart-header1">
            <span class="title">Percentage of total WEEE FEE declared by B</span>
            <span class="subtitle">有B申报WEEE总费用占比</span>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder" id="pieChart1">
              <!-- 这里将通过echarts渲染饼图 -->
            </div>
          </div>
        </div>

        <!-- 百分比 -->
        <div
          class="chart-container donut-chart"
          @click="showChartDialog('donut', '百分比', 'donutChart')"
        >
          <div class="chart-header1">
            <span class="title">Percentage of WEEE FEE in European countries</span>
            <span class="subtitle">欧洲各国WEEE费用百分比</span>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder" ref="donutChart">
              <!-- 这里将通过echarts渲染环形图 -->
            </div>
          </div>
        </div>

        <!-- Test3 -->
        <div
          class="chart-container pie-chart"
          @click="showChartDialog('pie', 'Test3', 'pieChart2')"
        >
          <div class="chart-header1">
            <span class="title">Perccentage of total watts of WEEE declared by B</span>
            <span class="subtitle">由B申报WEEE总瓦数占比</span>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder" ref="pieChart2">
              <!-- 这里将通过echarts渲染饼图 -->
            </div>
          </div>
        </div>

        <!-- 测试检测 -->
        <div class="chart-container data-input">
          <div class="chart-header1">
            <span class="title">Invoice Check</span>
            <span class="subtitle">发票核对</span>
          </div>
          <div class="chart-content centered-content">
            <div class="big-percentage">85%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :modal="false"
      width="70%"
      :before-close="handleDialogClose"
    >
      <div id="dialogChart" style="width: 100%; height: 400px"></div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getSelectData,getTopData,getMiddleLeft,getMiddleRight} from "../api/user";
import MapChart from "./MapChart.vue";
export default {
  name: "Dashboard",
  components: {
      MapChart,
    },
  data() {
    return {
      sreachForm:{
        a:"",
        b:"",
        c:"",
        d:"",
        e:"",
        f:"",
        g:"",
        h:"",
      },
      //地图相关
      chart: null,
      pieChart2: null,
      largeChart: null,
      dialogVisible: false,
      countryNameMapping: {
        Finland: "芬兰",
        Sweden: "瑞典",
        Netherlands: "荷兰",
        France: "法国",
        Spain: "西班牙",
        Portugal: "葡萄牙",
        Italy: "意大利",
      },
      currentCurrency: "¥",
      currencies: [
        { symbol: "¥", rate: 1 },
        { symbol: "$", rate: 0.14 },
        { symbol: "€", rate: 0.13 },
      ],
      isLightMode: false,
      countryOptions: [],
      declarationOptions:[],
      modeOptions:[],
      customerOptions:[],
      proposerOptions:[],
      modelOptions:[],
      total:'',
      totalData:0,
      fee:0,
      totalFee:0,
      weight:0,
      number:0,
      // 图表数据
      barData: [7132.23, 6110.27, 5231.26, 8753.27, 4954.28, 5712.29, 6953.27],
      lineData: [17, 22, 15, 23, 21, 18, 21],
      months: [
        "2025-06",
        "2025-07",
        "2025-08",
        "2025-09",
        "2025-10",
        "2025-11",
        "2025-12",
      ],
      pieData: [
        { value: 25, name: "否" },
        { value: 75, name: "是" },
      ],
      baifenbiData:[
        { value: 11.5896, name: "test7" },
        { value: 11.5896, name: "test1" },
        { value: 11.5896, name: "test2" },
        { value: 11.5896, name: "test3" },
        { value: 11.5896, name: "test4" },
        { value: 11.5896, name: "test5" },
        { value: 11.5896, name: "test6" },
      ],
      donutData: [
        { value: 11.5896, name: "test1" },
        { value: 11.5896, name: "test2" },
        { value: 11.5896, name: "test3" },
        { value: 11.5895, name: "test4" },
        { value: 11.5896, name: "test5" },
        { value: 11.5896, name: "test6" },
        { value: 11.5896, name: "test7" },
      ],
      mapData: [
        { name: "France", value: 0.5047 },
        { name: "Poland", value: 0.6054 },
      ],
      curveData: [],
      lineDate:[],
      lineList:[],
      // 弹窗相关
      dialogVisible: false,
      dialogTitle: "",
      dialogChartInstance: null,
    };
  },
  mounted() {
    this.getSelectDataList();
    this.getTopDataList();
    this.initCharts();
    const savedTheme = localStorage.getItem("dashboardTheme");
    if (savedTheme) {
      this.isLightMode = savedTheme === "light";
      // 初始化时同步主题状态到store
      this.$store.dispatch('app/toggleLightMode', this.isLightMode);
    }
  },
  watch: {
    isLightMode() {
      // 销毁所有图表实例
      this.disposeCharts();
      // 重新初始化所有图表
      this.initCharts();
    },
  },
  computed: {
    currencyRate() {
      const currency = this.currencies.find(
        (c) => c.symbol === this.currentCurrency
      );
      return currency ? currency.rate : 1;
    },
    textColor() {
      return this.isLightMode ? "#333" : "#FFF";
    },
    axisLineColor() {
      return this.isLightMode ? "#666" : "#706D6B";
    },
  },
  methods: {
    //总成本
    getCurrency(symbol) {
      this.currentCurrency = symbol;
      console.log(symbol,'symbol');
      if(symbol === "¥"){
        this.totalData = this.total.rmb;
        return; 
      }else if(symbol === "$"){
        this.totalData = this.total.usd;
        return; 
      }else if(symbol === "€"){
        this.totalData = this.total.eur;
        return;
      }
    },
    //获取顶部查询数据
   async getSelectDataList(){
     await getSelectData().then(res => {
        console.log(res);
        //成员国家
        this.countryOptions = res.data.country;
        //是否有B申报WEEE
        this.declarationOptions = res.data.is;
        //销售模式
        this.modeOptions = res.data.pattern;
        //客户
        this.customerOptions = res.data.user;
        //申请人
        this.proposerOptions = res.data.people;
        //组件型号
        this.modelOptions = res.data.model;
      });
    },
    //获取顶部数据
    async getTopDataList(){
      await getTopData().then(res => {
        console.log(res);
        this.total = res.data.total;
        this.totalData = res.data.total.rmb;
        this.fee = res.data.fee;
        this.totalFee = res.data.totalFee;
        this.weight = res.data.weight;
        this.number = res.data.number;
      });
    },
    // 弹窗相关方法
    handleDialogClose(done) {
      if (this.dialogChartInstance) {
        this.dialogChartInstance.dispose();
      }
      done();
    },

    showChartDialog(type, title, chartId) {
      this.dialogTitle = title + "详情";
      this.dialogVisible = true;

      this.$nextTick(() => {
        if (this.dialogChartInstance) {
          this.dialogChartInstance.dispose();
        }

        this.dialogChartInstance = echarts.init(
          document.getElementById("dialogChart")
        );

        let option;
        switch (type) {
          case "line":
            option = this.getLineChartOption(true);
            break;
          case "curve":
            option = this.getZheLineChartOption(true);
            break;
          case "pie":
            option = this.getPieChartOption(true);
            break;
          case "donut":
            option = this.getDonutChartOption(true);
            break;
          case "map":
            option = this.getMapChartOption(true);
            break;
          case "data":
            // 对于简单数据展示，直接在弹窗中显示大号百分比
            document.getElementById("dialogChart").innerHTML =
              '<div class="centered-content"><div class="big-percentage" style="font-size: 120px;">85%</div></div>';
            return;
          default:
            return;
        }

        if (chartId === 'pieChart2') {
          option = this.getPieChartOption(true);
        }

        this.dialogChartInstance.setOption(option);
      });
    },

    disposeCharts() {
      // 销毁所有图表实例
      const chartIds = [
        "lineMain",
        "zheLineMain",
        "pieChart1",
        "pieChart2",
        "pieChart3",
      ];
      chartIds.forEach((id) => {
        const chart = echarts.getInstanceById(id);
        if (chart) chart.dispose();
      });
    },
    initCharts() {
      this.lineChart();
      this.zhelineChart();
      this.pieChart();
      this.donutChart();
      this.mapChart();
    },
    // 获取折线图配置
    getLineChartOption(isDetailed = false) {
      return {
        title: {
          text: 'European total WEEE FEE statistics table',
          subtext: '欧洲WEEE总成本统计表',
          left: 'center',
          top: 10,
          bottom: 30,
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color:'#CBA675'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        grid: {
          top: isDetailed ? "20%" : "35%",
          bottom: "10%",
          left: isDetailed ? "5%" : "3%",
          right: isDetailed ? "5%" : "4%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        legend: {
          data: ["增长率", "金额(百万元)"],
          top: isDetailed ? "13" : "15%",
          right:"3%",
          textStyle: {
            color: this.textColor,
          },
        },
        xAxis: {
          data: this.lineDate,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.axisLineColor,
            },
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.textColor,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "金额(百万元)",
            nameTextStyle: {
              color: this.textColor,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: this.axisLineColor,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: this.textColor,
              },
            },
          },
          {
            type: "value",
            name: "同比",
            nameTextStyle: {
              color: this.textColor,
            },
            position: "right",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} %",
              textStyle: {
                color: this.textColor,
              },
            },
          },
          {
            type: "value",
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: this.isLightMode
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "rgba(242, 201, 131, 0.4)" },
                      { offset: 1, color: "rgba(242, 201, 131, 0.1)" }
                    ])
                  : "rgb(71, 60, 48,0.2)",
              },
            },
          },
        ],
        series: [
          {
            name: "增长率",
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: isDetailed ? 15 : 12,
            itemStyle: {
              color: "#F2C983",
              borderColor: "#F2C983",
              borderWidth: 2,
            },
            lineStyle: {
              color: "#F2C983",
              width: isDetailed ? 3 : 2,
            },
            areaStyle: {
              color: this.isLightMode
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(242, 201, 131, 0.4)" },
                    { offset: 1, color: "rgba(242, 201, 131, 0.1)" }
                  ])
                : "rgb(71, 60, 48,0.2)",
            },
            data: this.lineList,
          },
          {
            name: "金额(百万元)",
            type: "bar",
            barWidth: isDetailed ? 25 : 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
                  {
                    offset: 0,
                    color: "#DAB178",
                  },
                  {
                    offset: 1,
                    color: this.isLightMode ? "#F5DEB3" : "#261E19",
                  },
                ]),
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            data: this.barList,
          },
        ],
      };
    },

    // 获取曲线图配置
    getZheLineChartOption(isDetailed = false) {
      return {
        title: {
          text: 'WEEE FEE per watt comparison chart for European countries',
          subtext: '欧洲各国WEEE单瓦成本比对图',
          left: 'center',
          top: 10,
          bottom: 30,
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color:'#CBA675'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: this.textColor,
          },
        },
        legend: {
          top: "18%",
          textStyle: {
            color: this.textColor,
          },
          data: Array.from({ length: isDetailed ? 20 : 10 }, (_, i) =>
            (i + 1).toString()
          ),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: isDetailed ? "23%" : "27%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: Array.from({ length: 13 }, (_, i) => (i + 1).toString()),
          axisLabel: {
            color: this.textColor,
          },
          axisLine: {
            lineStyle: {
              color: this.axisLineColor,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: this.textColor,
          },
          axisLine: {
            lineStyle: {
              color: this.axisLineColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.isLightMode ? "#eee" : "#444",
            },
          },
        },
        series: Array.from({ length: isDetailed ? 20 : 10 }, (_, i) => ({
          name: (i + 1).toString(),
          type: "line",
          smooth: true,
          showSymbol: isDetailed,
          stack: "总量",
          color: this.getColorForIndex(i),
          lineStyle: {
            width: isDetailed ? 2 : 1,
          },
          data:
            i < 19
              ? [
                  220, 182, 191, 234, 290, 330, 310, 300, 290, 280, 275, 270,
                  265,
                ]
              : [
                  150, 232, 201, 154, 190, 330, 410, 400, 390, 380, 370, 360,
                  350,
                ],
        })),
      };
    },

    // 获取饼图配置
    getPieChartOption(isDetailed = false) {
      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#EBC1AA" },
          { offset: 1, color: "#D57A66" },
        ]),
        "#EFCD82",
      ];
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: this.textColor,
          },
          backgroundColor: this.isLightMode
            ? "rgba(255,255,255,0.9)"
            : "rgba(0,0,0,0.7)",
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: isDetailed ? ["30%", "60%"] : ["24%", "45%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: "outside",
              formatter: "{a|{b}：{d}%}\n{hr|}",
              color: this.textColor,
              fontSize: isDetailed ? 16 : 12,
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  padding: [-30, 15, -20, 15],
                  color: this.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                length: isDetailed ? 30 : 20,
                length2: isDetailed ? 40 : 30,
                lineStyle: {
                  width: 1,
                  color: this.isLightMode ? "#666" : "rgba(255,255,255,0.3)",
                },
              },
            },
            data: this.pieData,
          },
        ],
      };
    },

    // 获取环形图配置
    getDonutChartOption(isDetailed = false) {
      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: "#EBC1AA" },
          { offset: 1, color: "#D57A66" },
        ]),
        "#EFCD82",
        "#EFC472",
        "#F0D18F",
        "#EABB68",
        "#EABB68",
        "#DFC170",
        "#F3C97A",
        "#E8B96A",
      ];
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: this.textColor,
          },
          backgroundColor: this.isLightMode
            ? "rgba(255,255,255,0.9)"
            : "rgba(0,0,0,0.7)",
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: isDetailed ? ["30%", "60%"] : ["24%", "45%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: "outside",
              formatter: "{a|{b}：{d}%}\n{hr|}",
              color: this.textColor,
              fontSize: isDetailed ? 16 : 12,
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  padding: [-30, 15, -20, 15],
                  color: this.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                length: isDetailed ? 30 : 20,
                length2: isDetailed ? 40 : 30,
                lineStyle: {
                  width: 1,
                  color: this.isLightMode ? "#666" : "rgba(255,255,255,0.3)",
                },
              },
            },
            data: this.baifenbiData,
          },
        ],
      };
    },

    // 获取地图配置
    getMapChartOption(isDetailed = false) {
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: this.textColor,
          },
          backgroundColor: this.isLightMode
            ? "rgba(255,255,255,0.9)"
            : "rgba(0,0,0,0.7)",
        },
        visualMap: {
          min: 0,
          max: 1,
          text: ["高", "低"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
          },
          textStyle: {
            color: this.textColor,
          },
          left: isDetailed ? "right" : "left",
          top: isDetailed ? "top" : "bottom",
        },
        series: [
          {
            name: "世界地图",
            type: "map",
            map: "world",
            roam: true,
            emphasis: {
              label: {
                color: this.textColor,
              },
            },
            data: this.mapData,
          },
        ],
      };
    },

    async lineChart() {
      const myChart = echarts.init(document.getElementById("lineMain"));
      const option = this.getLineChartOption();
      const res = await getMiddleLeft();
      let data = res.data;
      this.lineDate = data.map(item => item.date);
      this.lineList = data.map(item => item.line.replace('%', ''));
      this.lineBar = data.map(item => item.bar);
      option.xAxis.data = this.lineDate;
      console.log(option,'option/.////////////');
      option.series[0].data = this.lineList;
      option.series[1].data = this.lineBar;

      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      this.chart = myChart;

      // 响应窗口大小变化
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    async zhelineChart() {
      const myChart = echarts.init(document.getElementById("zheLineMain"));
      const option = this.getZheLineChartOption();
      const res = await getMiddleRight();
      let data = res.data;
      this.zhelineDate = data.map(item => item.date);
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      this.chart = myChart;

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getColorForIndex(index) {
      const colors = [
        "#FFD700",
        "#FFC107",
        "#FFA500",
        "#FFB300",
        "#FFCC00",
        "#FFD54F",
        "#FFEB3B",
        "#FFFF00",
        "#FBC02D",
        "#FDD835",
        "#FFEE58",
        "#FFF176",
        "#FFE082",
        "#FFD54F",
        "#FFCA28",
        "#FFC107",
        "#FFB300",
        "#FFA000",
        "#FF8F00",
        "#FF6F00",
      ];
      return colors[index % colors.length];
    },
    pieChart() {
      const myChart = echarts.init(document.getElementById("pieChart1"));
      const option = this.getPieChartOption();
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      this.chart = myChart;

      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 初始化Test3饼图
      const pieChart2 = echarts.init(this.$refs.pieChart2);
      pieChart2.setOption(this.getPieChartOption());
      window.addEventListener('resize', () => {
        pieChart2.resize();
      });
      this.pieChart2 = pieChart2;
    },
    donutChart() {
      const myChart = echarts.init(this.$refs.donutChart);
      const option = this.getDonutChartOption();
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      this.chart = myChart;

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    mapChart() {
      const myChart = echarts.init(this.$refs.mapChart);
      const option = this.getMapChartOption();
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      this.chart = myChart;

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    toggleTheme() {
      this.isLightMode = !this.isLightMode;
      localStorage.setItem(
        "dashboardTheme",
        this.isLightMode ? "light" : "dark"
      );
      // 同步主题状态到store
      this.$store.dispatch('app/toggleLightMode', this.isLightMode);
    },
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #09090b;
  color: #ffffff;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 10px;
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* 浅色模式样式 */
.dashboard.light-mode {
  background-color: #E3E3E3;
  color: #333333;

  .filter-content,
  .chart-content,
  .chart-container,
  .metric-item {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 4px;
  }

  .metric-item {
    border: none;
    border-radius: 4px;
  }
  .subtitle {
    color: rgba(70, 90, 126, 0.6) !important;
  }

  .currency {
    color: #333 !important;
  }
  .bizhong .currency-symbol {
    color: #333 !important;
  }

  .metric-value {
    color: #d4a760 !important;
    background: linear-gradient(180deg, #d4a760 0%, #333333 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  .big-percentage {
    color: #d4a760 !important;
  }

  /* 修复标题文字颜色 */
  .chart-header .title,
  .chart-header1 .title,
  .filter-header .title,
  .filter-header1 .title,
  .metric-header .title {
    color: #333333 !important;
    background: #333333 !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
}

/* 主题切换按钮 */
.theme-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.theme-toggle-btn {
  background-color: rgba(230, 195, 132, 0.2);
  border: 1px solid rgba(230, 195, 132, 0.5);
  color: #e6c384;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.light-mode .theme-toggle-btn {
  background-color: rgba(70, 90, 126, 0.2);
  border: 1px solid rgba(70, 90, 126, 0.5);
  color: #465a7e;
}

.theme-toggle-btn:hover {
  background-color: rgba(230, 195, 132, 0.3);
}

.light-mode .theme-toggle-btn:hover {
  background-color: rgba(70, 90, 126, 0.3);
}

/* 顶部筛选区域 */
.filter-section {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

.filter-item {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.date-filter {
  grid-column: span 2;
}

.logo-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.honda-logo {
  width: 100%;
  height: 100%;
}

.filter-header {
  display: flex;
  align-items: center;
  background-image: url("../assets/titleIcon.png");
  background-size: 100% 100%;
  // height: 21px;
  padding: 0 15px;
  margin-bottom: 8px;
  .title {
    font-size: 13px;
    color: #f8dec7;
    font-weight: bold;
    background: linear-gradient(
      0deg,
      #ffeece 0%,
      #fffaed 48.779296875%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 5px;
    white-space: pre-line;
    margin-bottom: 4px;
    line-height: 1.5;
  }
  .subtitle {
    white-space: pre-line;
    font-size: 12px;
    color: #666;
    line-height: 1.3;
  }
}
.filter-header1 {
  display: flex;
  align-items: center;
  background-image: url("../assets/iconLang.png");
  background-size: 100% 100%;
  height: 21px;
  padding: 0 15px;
  .title {
    font-size: 18px;
    color: #f8dec7;
    font-weight: bold;
    background: linear-gradient(
      0deg,
      #ffeece 0%,
      #fffaed 48.779296875%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 5px;
  }
}

::v-deep .el-input--suffix .el-input__inner {
  background-color: #09090b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
}
::v-deep .el-select-dropdown {
  background-color: #09090b;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
::v-deep .el-select-dropdown__item {
  color: #fff;
}
::v-deep .el-select .el-input__suffix .el-select__caret {
  color: #fff;
}
::v-deep .popper__arrow::after {
  border-bottom-color: #fff !important;
}
::v-deep.el-select-dropdown__item.selected {
  background-color: #09090b;
}
::v-deep.el-select-dropdown__item.hover {
  background-color: #333;
}
.light-mode {
  ::v-deep .el-input--suffix .el-input__inner {
    background-color: #fff;
    border: 1px solid rgba(70, 90, 126, 0.1);
    color: #333;
  }
  ::v-deep .el-select-dropdown {
    background-color: #fff;
    border: 1px solid rgba(70, 90, 126, 0.1);
  }
  ::v-deep .el-select-dropdown__item {
    color: #333;
  }
  ::v-deep .el-select .el-input__suffix .el-select__caret {
    color: #333;
  }
  ::v-deep .popper__arrow::after {
    border-bottom-color: #fff !important;
  }
  ::v-deep.el-select-dropdown__item.selected {
    background-color: #f5f7fa;
  }
}

.subtitle {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
  margin-left: 5px;
  white-space: nowrap;
}

.filter-content {
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex: 1;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  ::v-deep .el-range-editor.el-input__inner {
    background-color: #09090b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  ::v-deep .el-date-editor .el-range-input {
    background-color: #09090b;
    color: #fff;
  }
  ::v-deep .el-date-range-picker__content.is-left {
    background-color: #09090b;
  }
  ::v-deep .el-date-range-picker__content.is-right {
    background-color: #09090b;
  }
}

.light-mode {
  .filter-content {
    ::v-deep .el-range-editor.el-input__inner {
      background-color: #fff;
      border: 1px solid rgba(70, 90, 126, 0.1);
    }
    ::v-deep .el-date-editor .el-range-input {
      background-color: #fff;
      color: #333;
    }
    ::v-deep .el-date-range-picker__content.is-left {
      background-color: #fff;
    }
    ::v-deep .el-date-range-picker__content.is-right {
      background-color: #fff;
    }
  }
  .active-currency {
    background: rgba(70, 90, 126, 0.2);
    color: #fff !important;
    border: 1px solid rgba(70, 90, 126, 0.5);
  }
}

.select-wrapper {
  width: 100%;
}

.select {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.date-range {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  transition: all 0.3s ease;
}

.date-icon {
  margin-right: 10px;
}

.date-text {
  font-size: 12px;
}

.date-separator {
  margin: 0 10px;
}

/* 数据指标区域 */
.metrics-section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.metric-item {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.metric-header {
  // display: flex;
  // flex-wrap: wrap;
  // align-items: center;
  padding: 23px 0;
  .title {
    font-size: 16px;
    color: #f8dec7;
    font-weight: bold;
    background: linear-gradient(
      0deg,
      #ffeece 0%,
      #fffaed 48.779296875%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle{
    font-size: 12px;
    margin: 5px 0;
  }
  .currency {
    font-size: 18px;
    color: #f8dec7;
    font-weight: bold;
  }
}
.currency-symbol {
  margin: 0 2px;
  padding: 5px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
}
.active-currency {
  background: rgba(255, 255, 255, 0.3);
  color: #fff !important;
  border-radius: 4px;
  cursor: pointer;
}
.zonghe {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;
}
.metric-value {
  font-weight: bold;
  font-size: 22px;
  color: #f5c678;
  line-height: 85px;
  background: linear-gradient(180deg, #ffd885 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 图表区域 */
.charts-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.chart-container {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* 修改底部列表为网格布局，使5个模块平均分配 */
.bottomList {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  grid-column: span 3;
}

.chart-header {
  display: flex;
  align-items: center;
  background-image: url("../assets/iconzuichang.png");
  background-size: 100% 100%;
  // height: 30px;
  padding: 0 15px;
  .title {
    font-size: 18px;
    color: #f8dec7;
    font-weight: bold;
    background: linear-gradient(
      0deg,
      #ffeece 0%,
      #fffaed 48.779296875%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .currency {
    font-size: 18px;
    color: #f8dec7;
    font-weight: bold;
  }
}
.chart-header1 {
  display: flex;
  align-items: center;
  background-image: url("../assets/iconLang.png");
  background-size: 100% 100%;
  height: 30px;
  padding: 0 15px;
  .title {
    font-size: 14px;
    color: #f8dec7;
    font-weight: bold;
    background: linear-gradient(
      0deg,
      #ffeece 0%,
      #fffaed 48.779296875%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .currency {
    font-size: 18px;
    color: #f8dec7;
    font-weight: bold;
  }
}

.chart-content {
  flex: 1;
  // position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  min-height: 130px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.big-percentage {
  font-size: 48px;
  font-weight: bold;
  color: #e6c384;
  transition: color 0.3s ease;
}

/* 弹窗样式 */
::v-deep .el-dialog {
  background-color: #09090b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

::v-deep .el-dialog__title {
  color: #f8dec7;
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.light-mode {
  ::v-deep .el-dialog {
    background-color: #fff;
    border: 1px solid rgba(70, 90, 126, 0.1);
  }

  ::v-deep .el-dialog__title {
    color: #333;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid rgba(70, 90, 126, 0.1);
  }

  ::v-deep .el-overlay {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
  }
}
</style>
