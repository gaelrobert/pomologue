# Model and catalogue

`dinov2-small/model_quantized.onnx` is DINOv2 ViT-S/14 by Meta AI Research, converted to ONNX and
quantized to 8 bits by the onnx-community project. It is redistributed unchanged.

- Source: https://huggingface.co/onnx-community/dinov2-small-ONNX
  (revision 08c606e3123472a388efa59181b677d428f69bbd, file `onnx/model_quantized.onnx`)
- Original model: https://huggingface.co/facebook/dinov2-small
- Licence: Apache License 2.0, see `LICENSE-Apache-2.0.txt`.

The app runs it with ONNX Runtime Web (MIT licence, see `../vendor/LICENSE-onnxruntime.txt`).

`gallery.bin`, `transform.bin`, `config.json` and `varieties.json` form the variety catalogue:
variety names, and numbers averaged from descriptions of reference photos. No photo is included.
The reference photos come from pomologie.com, the Arborithèque de Normandie (Terre d'Appellations
Cidricoles), the Association Pomologique de Haute-Normandie, La Ferme des 3 Vergers and the booklet
"Les Conservatoires de Pommiers du Vieux Château et de la Cité des Pommiers"
(Saint-Sauveur-le-Vicomte, 2010). They remain the property of their authors.

Photos taken in the app are described on the phone; neither photos nor descriptions are sent anywhere.
