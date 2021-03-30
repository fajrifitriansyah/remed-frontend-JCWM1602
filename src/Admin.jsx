import React from 'react'
import Axios from 'axios'

const linkAPI = 'http://localhost:2000/products'

export default class Admin extends React.Component {

    state = {
        dataUsers: null,
        showForm: false,
        idSelected: null
    }

    componentDidMount() {
        console.log('Component Did Mount Jalan')
        this.onGetData()
    }

    onGetData = () => {
        Axios.get(linkAPI)
            .then((res) => {
                this.setState({ dataUsers: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onSubmitData = () => {
        let inputSerial = this.refs.serial.value
        let inputProduk = this.refs.produk.value
        let inputStok = this.refs.stok.value
        let inputHargaSatuan = this.refs.hargaSatuan.value
        let inputCategory = this.refs.category.value
        let inputStatus = this.refs.status.value

        if (inputSerial && inputProduk && inputStok && inputHargaSatuan && inputCategory && inputStatus) {
            Axios.post(linkAPI, { serial: inputSerial, produk: inputProduk, stok: inputStok, hargaSatuan: inputHargaSatuan, category: inputCategory, status: inputStatus })
                .then((res) => {
                    alert('Data Berhasil Ditambahkan')
                    this.onGetData()
                    this.refs.serial.value = ''
                    this.refs.produk.value = ''
                    this.refs.stok.value = ''
                    this.refs.hargaSatuan.value = ''
                    this.refs.category.value = ''
                    this.refs.status.value = ''
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Masukkan Seluruh Data!')
        }
    }

    onDeleteData = (idToDel) => {
        let resultConfirm = window.confirm('Anda Yakin?')

        if (resultConfirm === true) {
            Axios.delete(linkAPI + '/' + idToDel)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Data Berhasil Dihapus')
                        this.onGetData()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    onUpdateData = () => {
        let serialEdited = this.refs.serialEdit.value
        let produkEdited = this.refs.produkEdit.value
        let stokEdited = this.refs.stokEdit.value
        let hargaSatuanEdited = this.refs.hargaSatuanEdit.value
        let categoryEdited = this.refs.categoryEdit.value
        let statusEdited = this.refs.statusEdit.value

        let dataToSend = {
            serial: serialEdited,
            produk: produkEdited,
            stok: stokEdited,
            hargaSatuan: hargaSatuanEdited,
            category: categoryEdited,
            status: statusEdited
        }

        if (serialEdited && produkEdited && stokEdited && hargaSatuanEdited && categoryEdited && statusEdited) {
            Axios.patch(linkAPI + '/' + this.state.idSelected, dataToSend)
                .then((res) => {
                    console.log(res)
                    alert('Data Berhasil Diubah!')
                    this.setState({ idSelected: null })
                    this.onGetData()
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Masukkan Seluruh Data!')
        }
    }

    render() {
        if (this.state.dataUsers === null) {
            return (
                <div>
                    <h1>
                        Loading...
                    </h1>
                </div>
            )
        }
        return (
            <div className="container mt-3">
                <div className='d-flex justify-content-between mt-1'>
                    <div>
                        <h1>
                            Admin
                        </h1>
                    </div>
                    <div>
                        <input type="button" value='Tambah Data' className='btn btn-primary' onClick={() => this.setState({ showForm: true })} />
                    </div>
                </div>
                <table className="table table-bordered table-hover mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Serial Number</th>
                            <th scope="col">Produk</th>
                            <th scope="col">Stok</th>
                            <th scope="col">Harga Satuan</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th><center>Action</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.dataUsers.map((value, index) => {
                                if (this.state.idSelected === value.id) {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{value.id}</th>
                                            <td><input type="text" ref='serialEdit' className="w-50"  defaultValue={value.serial} />
                                            </td>
                                            <td><input type="text" ref='produkEdit' className="w-50" defaultValue={value.produk} />
                                            </td>
                                            <td><input type="text" ref='stokEdit' className="w-50" defaultValue={value.stok} />
                                            </td>
                                            <td><input type="text" ref='hargaSatuanEdit' className="w-50" defaultValue={value.hargaSatuan} />
                                            </td>
                                            <td><input type="text" ref='categoryEdit' className="w-50"  defaultValue={value.category} />
                                            </td>
                                            <td><input type="text" ref='statusEdit' className="w-50" defaultValue={value.status} />
                                            </td>
                                            <td>
                                                <center>
                                                    <input type="button" value='Save' className='btn btn-success' onClick={this.onUpdateData} />
                                                    <input type="button" value='Cancel' className='btn btn-danger mx-3' onClick={() => this.setState({ idSelected: null })} />
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.serial}</td>
                                            <td>{value.produk}</td>
                                            <td>{value.stok}</td>
                                            <td>{value.hargaSatuan}</td>
                                            <td>{value.category}</td>
                                            <td>{value.status}</td>
                                            <td>
                                                <center>
                                                    <input type="button" value='Edit' className='btn btn-warning' onClick={() => this.setState({ idSelected: value.id })} />
                                                    <input type="button" value='Delete' className='btn btn-danger mx-3' onClick={() => this.onDeleteData(value.id)} />
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
                {
                    this.state.showForm ?
                        <div>
                            <div>
                                <h1>
                                    Input Form
                            </h1>
                            </div>
                            <div>
                                <div>
                                    <input type="text" ref="serial" placeholder="Masukkan Serial Number Produk" className="form-control w-50" />
                                </div>
                                <div>
                                    <input type="text" ref="produk" placeholder="Masukkan Nama Produk" className="form-control w-50 my-3" />
                                </div>
                                <div>
                                    <input type="text" ref="stok" placeholder="Masukkan Stok Produk" className="form-control w-50 mb-3" />
                                </div>
                                <div>
                                    <input type="text" ref="hargaSatuan" placeholder="Masukkan Harga Satuan Produk" className="form-control w-50" />
                                </div>
                                <div>
                                    <input type="text" ref="category" placeholder="Masukkan Category Produk" className="form-control w-50 my-3" />
                                </div>
                                <div>
                                    <input type="text" ref="status" placeholder="Status Produk" className="form-control w-50 my-3" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <input type="button" value="Submit" className="btn btn-primary" onClick={this.onSubmitData} />
                                <input type="button" value="Cancel" className="btn btn-danger mx-3" onClick={() => this.setState({ showForm: false })} />
                            </div>
                        </div>

                        :
                        <div>
                            <h3>
                                Form Tidak Tampil
                        </h3>
                        </div>
                }
            </div>
        )
    }
}