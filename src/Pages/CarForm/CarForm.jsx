import React, { useEffect, useState } from "react";
import s from "./CarForm.module.scss";
import noCarImg from "../../Images/noCarImg.jpg";
import { NavLink } from "react-router-dom";
import addColorBtn from "../../Images/addColorBtnBorder.svg";
import { ReactSVG } from "react-svg";
import horizonLine from "../../Images/horizontlLine.svg";
import vertivalLine from "../../Images/verticalLine.svg";
import colorCheckBox from "../../Images/colorCheckBox.svg";
import check from "../../Images/check.svg";
import { postCar, setResponse } from "./../../Redux/cars-reducer";
import { connect } from "react-redux";
import close from "../../Images/close.png";
import checkIcon from "../../Images/check_icon.png";

const CarForm = ({ category, postCar, response, setResponse }) => {
  const [carImg, setCarImg] = useState();
  const [preview, setPreview] = useState();
  const [progress, setProgress] = useState(0);
  const [innerLineColor, setLineColor] = useState("#007bff");

  const [carModel, setCarModel] = useState("");
  const [isCarModelTouched, setCarModelTouched] = useState(false);

  const [carNumber, setCarNumber] = useState("");
  const [isCarNumberTouched, setCarNumberTouched] = useState(false);

  const [priceMin, setPriceMin] = useState();
  const [isPriceMinTouched, setPriceMinTouched] = useState(false);

  const [priceMax, setPriceMax] = useState();
  const [isPriceMaxTouched, setPriceMaxTouched] = useState(false);

  const [curCategory, setCategory] = useState();
  const [isCurCategoryTouched, setCurCategoryTouched] = useState(false);

  const [carDescription, setDescription] = useState("");
  const [isCarDescriptionTouched, setCarDescriptionTouched] = useState(false);

  const [tankValue, setTankValue] = useState();
  const [isTankValueTouched, setTankValueTouched] = useState(false);

  const [colorValue, setColorValue] = useState("");
  const [isColorValueTouched, setColorValueTouched] = useState(false);

  const [availabelColors, setAvailableColors] = useState([]);

  const handlerAddColor = () => {
    if (colorValue !== "") {
      setAvailableColors([...availabelColors, colorValue]);
      setColorValue("");
    }
  };

  const handlerDeleteColor = (colorDelete) => {
    setAvailableColors(
      availabelColors.filter((color) => color !== colorDelete)
    );
  };

  const handlerPhotoSelect = (e) => {
    setCarImg(e.target.files[0]);
    if (!carImg) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerModelInput = (value) => {
    setCarModel(value);
    setCarModelTouched(true);
    if (!carModel) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerNumberInput = (value) => {
    setCarNumber(value);
    setCarNumberTouched(true);
    if (!carNumber) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerPriceMinInput = (value) => {
    setPriceMin(value);
    setPriceMinTouched(true);
    if (!priceMin) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerPriceMaxInput = (value) => {
    setPriceMax(value);
    setPriceMaxTouched(true);
    if (!priceMax) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerCarCategory = (value) => {
    setCategory(value);
    setCurCategoryTouched(true);
    if (!curCategory) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerDescriptionInput = (value) => {
    setDescription(value);
    setCarDescriptionTouched(true);
    if (!carDescription) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerTankInput = (value) => {
    setTankValue(value);
    setTankValueTouched(true);
    if (!tankValue) {
      setProgress(progress + 11, 1111);
    }
  };

  const handlerColorInput = (value) => {
    setColorValue(value);
    setColorValueTouched(true);
    if (!colorValue && availabelColors.length === 0) {
      setProgress(progress + 11, 1111);
    }
  };

  useEffect(() => {
    if (!carImg && progress !== 0) setProgress(progress - 11, 1111);
  }, [carImg]);

  useEffect(() => {
    if (!carModel && progress !== 0) setProgress(progress - 11, 1111);
  }, [carModel]);

  useEffect(() => {
    if (!carNumber && progress !== 0) setProgress(progress - 11, 1111);
  }, [carNumber]);

  useEffect(() => {
    if (!priceMin && progress !== 0) setProgress(progress - 11, 1111);
  }, [priceMin]);

  useEffect(() => {
    if (!priceMax && progress !== 0) setProgress(progress - 11, 1111);
  }, [priceMax]);

  useEffect(() => {
    if (!curCategory && progress !== 0) setProgress(progress - 11, 1111);
  }, [curCategory]);

  useEffect(() => {
    if (!carDescription && progress !== 0) setProgress(progress - 11, 1111);
  }, [carDescription]);

  useEffect(() => {
    if (!tankValue && progress !== 0) setProgress(progress - 11, 1111);
  }, [tankValue]);

  useEffect(() => {
    if (!colorValue && availabelColors.length === 0 && progress !== 0)
      setProgress(progress - 11, 1111);
  }, [colorValue, availabelColors]);

  useEffect(() => {
    if (progress === 99) {
      setProgress(100);
    }
    if (progress === 1) {
      setProgress(0);
    }
    if (progress === 100) {
      setLineColor("#0EC261");
    }
    if (progress !== 100) {
      setLineColor("#007bff");
    }
  }, [progress]);

  useEffect(() => {
    if (!carImg) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(carImg);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [carImg]);

  const onSubmit = () => {
    if (
      carImg &&
      carModel &&
      carNumber &&
      priceMin &&
      priceMax &&
      curCategory &&
      carDescription &&
      tankValue &&
      availabelColors
    ) {
      const formData = new FormData();
      formData.append("priceMax", parseInt(priceMax));
      formData.append("priceMin", parseInt(priceMin));
      formData.append("name", carModel);
      formData.append("thumbnail[]", carImg);
      formData.append("description", carDescription);
      formData.append("categoryId[id]", curCategory);
      for (let i = 0; i < availabelColors.length; i++) {
        formData.append(`colors[${i}]`, availabelColors[i]);
      }

      postCar(formData);
    }
  };

  const closeSuccessInfo = () => {
    setResponse("");
  };

  return (
    <section>
      {response.length !== 0 && (
        <div className={s.successResponse}>
          <div className={s.leftSuccessInfo}>
            <img src={checkIcon} alt="chech" />
            <span>Успех! Машина сохранена</span>
          </div>
          <div className={s.rightSuccesInfo} onClick={closeSuccessInfo}>
            <img src={close} alt="close" />
          </div>
        </div>
      )}

      <div className={s.carChangePageWrapper}>
        <div className={s.carFormTitle}>Карточка Автомобиля</div>
        <div className={s.formWrapper}>
          <form>
            <div className={s.leftFormBlock}>
              <div className={s.carImageWrapper}>
                <img src={preview ? preview : noCarImg} alt="NoCarImg" />
              </div>
              <div className={s.leftCarInfo}>
                <span className={s.carName}>{carModel}</span>
                <span className={s.category}>Люкс</span>
              </div>
              <div className={s.fileSelect}>
                <input
                  type={"file"}
                  id="input_file"
                  onChange={handlerPhotoSelect}
                />
                <label htmlFor="input_file">
                  <div className={s.labelWrapper}>
                    <div className={s.selectFileText}>
                      {carImg ? carImg.name : "Выберите файл..."}
                    </div>
                    <div className={s.selectBtn}>Обзор</div>
                  </div>
                </label>
              </div>

              <div className={s.loadProcessWrapper}>
                <div className={s.loadProcessContainer}>
                  <div className={s.loadProcessText}>
                    <span>Заполненно</span>
                    <span>{progress}%</span>
                  </div>
                  <div className={s.outerProcessLine}>
                    <div
                      className={s.innerProcessLine}
                      style={{
                        width: `${progress}%`,
                        background: `${innerLineColor}`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={s.carDescription}>
                <div className={s.descriptionText}>Описание</div>
                <p className={s.description}>{carDescription}</p>
              </div>
            </div>
            <div className={s.rightFormBlock}>
              <div className={s.carSettingsText}>Настройки автомобиля</div>
              <div className={s.rightInputsWrapper}>
                <div className={s.leftColumn}>
                  <div className={s.fieldWrapper}>
                    <label>Модель автомобиля</label>
                    <input
                      className={
                        isCarModelTouched && !carModel
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="text"
                      value={carModel}
                      onChange={(event) =>
                        handlerModelInput(event.target.value)
                      }
                    />

                    {isCarModelTouched && !carModel && (
                      <div className={s.inputErrorMsg}>
                        Введите название модели автомобиля
                      </div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Номер</label>
                    <input
                      className={
                        isCarNumberTouched && !carNumber
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="text"
                      value={carNumber}
                      onChange={(event) =>
                        handlerNumberInput(event.target.value)
                      }
                    />
                    {isCarNumberTouched && !carNumber && (
                      <div className={s.inputErrorMsg}>
                        Введите номер автомобиля
                      </div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Мин. Цена</label>
                    <input
                      className={
                        isPriceMinTouched && !priceMin
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="number"
                      value={priceMin}
                      onChange={(event) =>
                        handlerPriceMinInput(event.target.value)
                      }
                    />
                    {isPriceMinTouched && !priceMin && (
                      <div className={s.inputErrorMsg}>
                        Введите минимальную цену
                      </div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Макс. цена</label>
                    <input
                      className={
                        isPriceMaxTouched && !priceMax
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="number"
                      value={priceMax}
                      onChange={(event) =>
                        handlerPriceMaxInput(event.target.value)
                      }
                    />
                    {isPriceMaxTouched && !priceMax && (
                      <div className={s.inputErrorMsg}>
                        Введите максимальную цену
                      </div>
                    )}
                  </div>
                </div>

                <div className={s.rightColumn}>
                  <div className={s.fieldWrapper}>
                    <label>Категория</label>
                    <select
                      onChange={(e) => handlerCarCategory(e.target.value)}
                      className={
                        isCurCategoryTouched && !curCategory
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                    >
                      <option></option>
                      {category.data.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                    {isCurCategoryTouched && !curCategory && (
                      <div className={s.inputErrorMsg}>Выберите категорию</div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Описание</label>
                    <textarea
                      className={
                        isCarDescriptionTouched && !carDescription
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="text"
                      value={carDescription}
                      onChange={(e) => handlerDescriptionInput(e.target.value)}
                    />
                    {isCarDescriptionTouched && !carDescription && (
                      <div className={s.inputErrorMsg}>Заполните описание</div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Количество топлива</label>
                    <input
                      className={
                        isTankValueTouched && !tankValue
                          ? `${s.inputField} ${s.inputWithError}`
                          : s.inputField
                      }
                      type="number"
                      value={tankValue}
                      onChange={(e) => handlerTankInput(e.target.value)}
                    />
                    {isTankValueTouched && !tankValue && (
                      <div className={s.inputErrorMsg}>
                        Введите количество топлива
                      </div>
                    )}
                  </div>

                  <div className={s.fieldWrapper}>
                    <label>Доступные цвета</label>
                    <div className={s.addColorsInput}>
                      <input
                        // className={
                        //   isColorValueTouched && !colorValue
                        //     ? `${s.inputField} ${s.inputWithError}`
                        //     : s.inputField
                        // }
                        className={s.inputField}
                        type="text"
                        value={colorValue}
                        onChange={(e) => handlerColorInput(e.target.value)}
                      />
                      <div
                        className={s.addColorBtnWrapper}
                        onClick={handlerAddColor}
                      >
                        <ReactSVG src={addColorBtn} />
                        <div className={s.verticalLine}>
                          <ReactSVG src={vertivalLine} />
                        </div>
                        <div className={s.horizontLine}>
                          <ReactSVG src={horizonLine} />
                        </div>
                      </div>
                    </div>

                    <div className={s.availabelColorsWrapper}>
                      {availabelColors &&
                        availabelColors.map((color, index) => (
                          <div key={index} className={s.colorWrapper}>
                            <div
                              className={s.checkBoxSvgWrapper}
                              onClick={() => handlerDeleteColor(color)}
                            >
                              <ReactSVG src={colorCheckBox} />
                              <div className={s.checkSvg}>
                                <ReactSVG src={check} />
                              </div>
                            </div>

                            {color}
                          </div>
                        ))}
                    </div>

                    {/* {isColorValueTouched && !colorValue && (
                      <div className={s.inputErrorMsg}>Добавьте цвет</div>
                    )} */}
                  </div>
                </div>
              </div>
              <div className={s.buttonsWrapper}>
                <button onClick={onSubmit} type="submit">
                  Сохранить
                </button>
                <NavLink to="/Cars">Отменить</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  response: state.cars.response,
});

export default connect(mapStateToProps, { postCar, setResponse })(CarForm);