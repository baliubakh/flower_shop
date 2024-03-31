"use client";

import { IJwtPayload } from "@/src/utils/authenticate";
import React, { ChangeEvent, useState } from "react";
import styles from "./admin.module.scss";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/src/redux/services/product";
import ProductCard from "@/src/components/productCard";
import TextInput from "@/src/components/input";
import Loader from "@/src/components/loader";
import Button from "@/src/components/button";
import AddNewProduct from "./components/addNew";
import EditProductModal from "./components/editProduct";
import { IProduct, IProductBody } from "@/src/types/product";
import { IAdmin, IProductCard } from "@/src/types";

interface IAdminContentProps {
  userData: IJwtPayload;
  pageData: IAdmin;
  productCardData: IProductCard;
}

const AdminContent = ({ pageData, productCardData }: IAdminContentProps) => {
  const { data, isLoading, isFetching } = useGetAllProductsQuery();
  const [search, setSearch] = useState<string>("");
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editingObj, setEditingObj] = useState<
    Partial<IProductBody> & { id: string; photos: string[] }
  >();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  const toggleEditModal = () => setIsEditOpen((prev) => !prev);

  const handleEditClick = (product: IProduct) => {
    const { name, description, category, quantity, price, photos, id } =
      product;
    setEditingObj({
      name,
      description,
      category,
      quantity,
      price,
      photos,
      id: id.toString(),
    });
    toggleEditModal();
  };

  const toggleAddBlock = () => setIsAddOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.searchBtnWrapper}>
          <div className={styles.searchWrapper}>
            <TextInput
              placeholder={pageData.search}
              onChange={handleSearchInput}
            />
          </div>
          <div>
            <Button
              text={isAddOpen ? pageData.cancel : pageData.addNew.btn}
              color="brandColor1"
              onClick={toggleAddBlock}
            />
          </div>
        </div>

        <div
          className={`${styles.addWrapper} ${
            isAddOpen ? styles.addWrapperOpen : ""
          }`}
        >
          <AddNewProduct onClose={toggleAddBlock} pageData={pageData.addNew} />
        </div>
      </div>
      {((isLoading || isFetching || isDeleteLoading) && <Loader />) || (
        <div className={styles.cardsWrapper}>
          {data
            ?.filter(
              ({ name, category }) =>
                name.includes(search) || category.includes(search)
            )
            .map((product) => (
              <ProductCard
                key={product.id}
                isAdmin
                onTrashClick={handleDeleteProduct}
                onEditClick={handleEditClick}
                pageData={productCardData}
                {...product}
              />
            ))}
        </div>
      )}
      {isEditOpen && editingObj && (
        <EditProductModal
          handleClose={toggleEditModal}
          data={editingObj}
          pageData={pageData.editProduct}
        />
      )}
    </div>
  );
};

export default AdminContent;
