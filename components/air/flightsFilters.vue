<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option v-for="(item,index) in data.options.airport" :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option v-for="(item,index) in data.options.flightTimes" :key="index"
                    :label="item.from +':00' + '-' + item.to +':00'"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option v-for="(item,index) in data.options.company" :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option v-for="(item,index) in [{type:'大',value:'L'},{type:'中',value:'M'},{type:'小',value:'S'}]" :key="index"
                    :label="item.type"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
        }
    },
    methods: {
        // 封装筛选方法
        init(name,value){
            const arr = this.data.flights.filter((e) => {
                return e[name] === value
            })
            // 子传父，将筛选好的数组返回给父组件，重新渲染数据
            this.$emit('changeData',arr)
        },
        // 选择机场时候触发
        handleAirport(value){
            this.init('org_airport_name',value)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const {from,to} = value
            this.flightTimes = from +':00' + '-' + to +':00'
            // console.log(from);
            
            const arr = this.data.flights.filter((e) => {
                let start = e.dep_time.split(':')[0]
                return from <= (+start ) && to > (+start )
            })
            // 子传父，将筛选好的数组返回给父组件，重新渲染数据
            this.$emit('changeData',arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            this.init('airline_name',value)
        },

         // 选择机型时候触发
        handleAirSize(value){
            this.init('plane_size',value)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = ''
            this.flightTimes = ''
            this.company = ''
            this.airSize = ''
            this.$emit('changeData',this.data.flights)
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>