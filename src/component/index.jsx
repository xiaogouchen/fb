import React, { Component } from 'react'
import { Table, Tag, Button, Popover, Modal, Tabs, Input } from 'antd'
import { ReactSVG } from 'react-svg'
import axios from 'axios'


export default class AntTable extends Component {

	state = {
		dataSource: [],
		modalShow: false,
		modalData: [],
		filterData: [],
		copyData: [],
		columns: [
			{
				title: '姓名',
				dataIndex: 'name',
				width: 300,
				align: 'center',
			},
			{
				title: '描述',
				dataIndex: 'description',
				width: 300,
				align: 'center',
				ellipsis: true,
				render: text => <Popover arrowPointAtCenter content={text} style={{width: 300}}><span>{text}</span></Popover>
			},
			{
				title: 'url',
				dataIndex: 'baseURL',
				align: 'center',
				render: text => <a href={text}>链接</a>
			},
			{
				title: '图片',
				dataIndex: 'image',
				align: 'center',
				render: text => <img src={text} alt="" width="100px"/>
			},
			{
				title: 'Tags',
				dataIndex: 'tags',
				align: 'center',
				width: 200,
				render: tags => (
					<>
						{tags.map(tag => {
							let color = tag.length > 5 ? 'geekblue' : 'green';
							if (tag === 'loser') {
								color = 'volcano';
							}
							return (
								<Tag style={{margin: '5'}} color={color} key={tag}>
									{tag.toUpperCase()}
								</Tag>
							);
						})}
					</>
				),
			},
			{
				title: '属性',
				dataIndex: 'properties',
				render: (text, record) => <Button onClick={() => this.handleModalShow(record)} type='primary'>详细</Button>,
			}
		],
		modalColums: [
			{
				title: 'type',
				dataIndex: 'type'
			},
			{
				title: 'url',
				dataIndex: 'url'
			}
		]
	}


	componentDidMount() {
		axios.get('http://www.mocky.io/v2/5ea28891310000358f1ef182').then(res => {
			const { data = {} } = res
			this.setState({
				dataSource: data.apis,
				copyData: data.apis
			})
		})
	}

	handleModalShow = (modalData) => {
		console.log('modalData:' ,modalData.properties)
		this.setState({ modalShow: true,  modalData: modalData.properties})
	}

	handleOk = () => {
		this.setState({ modalShow: false })
	}

	tableDataFilter = (e) => {
		let value = e.target.value
		let temp = []
		this.state.copyData.map((item, index) => {
			console.log(">???:", item.tags.toString())
			if(item.tags.toString().indexOf(value) > -1) {
				// console.log('有符合的', item.tags)
				temp.push(item)
				this.setState({ dataSource: temp })
			} else {
				console.log('没有符合的')
			}
		})
	}

	render() {
		const { dataSource, columns, modalData, modalColums } = this.state
		const tableOption = {
			columns,
			dataSource,
			rowKey: "name",
		}
		return (
			<div>
				<div style={{width: 200 }}>
					<Input onChange={this.tableDataFilter} placeholder={'请输入筛选'}/>
				</div>
				<Table {...tableOption} />
				<Modal 
					width='50vw'
					centered
					title='info detial' 
					visible={this.state.modalShow}
					onOk={this.handleOk}
					onCancel={this.handleOk}
				>
					<Table dataSource={modalData} columns={modalColums}/>
				</Modal>
			</div>
		)
	}
}
