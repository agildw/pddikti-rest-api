import { Request, Response } from "express";
import axios from "axios";
const getData = async (req: Request, res: Response) => {
  const baseUrl = process.env.PDDIKTI_API_URL;
  let name: string = encodeURIComponent(req.query.name as string);
  const decodeName = decodeURIComponent(name);

  if (!req.query.name)
    return res.status(400).json({
      error: true,
      message: "parameter name is required",
    });

  //get dosen, pt, and prodi data from pddikti
  let dataGeneral: any;
  try {
    dataGeneral = await axios.get(`
        ${baseUrl}/hit/${name}
    `);
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }

  //get mahasiswa data from pddikti
  let dataMahasiswa: any;
  try {
    dataMahasiswa = await axios.get(`
        ${baseUrl}/hit_mhs/${name}
    `);
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }

  const data = {
    dosen: dataGeneral.data.dosen.map((dosen: any) => {
      return {
        name: dosen.text.split(",")[0],
        nidn: dosen.text.split(",")[1]?.split(":")[1]?.trim(),
        pt: dosen.text.split(",")[2]?.split(":")[1]?.trim(),
        prodi: dosen.text.split(",")[3].split(":")[1]?.trim(),
        link: process.env.PDDIKTI_FRONTEND_URL + dosen["website-link"],
      };
    }),
    pt: dataGeneral.data.pt.map((pt: any) => {
      return {
        name: pt.text.split(",")[0]?.split(":")[1]?.trim(),
        npsn: pt.text.split(",")[1]?.split(":")[1]?.trim(),
        singkatan: pt.text.split(",")[2]?.split(":")[1]?.trim(),
        alamat: pt.text.split(",")[3]?.split(":")[1]?.trim(),
        link: process.env.PDDIKTI_FRONTEND_URL + pt["website-link"],
      };
    }),

    prodi: dataGeneral.data.prodi.map((prodi: any) => {
      return {
        name: prodi.text.split(",")[0]?.split(":")[1]?.trim(),
        jenjang: prodi.text.split(",")[1]?.split(":")[1]?.trim(),
        lembaga: prodi.text.split(",")[2]?.split(":")[1]?.trim(),
        link: process.env.PDDIKTI_FRONTEND_URL + prodi["website-link"],
      };
    }),

    mahasiswa: dataMahasiswa.data.mahasiswa.map((mahasiswa: any) => {
      return {
        name: mahasiswa.text.split(",")[0]?.split("(")[0],
        nim: mahasiswa.text
          .split(",")[0]
          .match(/\(([^)]+)\)/)[1]
          .trim(),
        pt: mahasiswa.text.split(",")[1]?.split(":")[1]?.trim(),
        prodi: mahasiswa.text.split(",")[2]?.split(":")[1]?.trim(),
        link: process.env.PDDIKTI_FRONTEND_URL + mahasiswa["website-link"],
      };
    }),
  };

  if (req.query.exact === "true") {
    //exact search
    data.dosen = data.dosen.filter((dosen: any) => {
      if (!dosen.name) {
        return false;
      }
      return dosen.name.toLowerCase() === decodeName.toLowerCase();
    });
    data.pt = data.pt.filter((pt: any) => {
      if (!pt.name) {
        return false;
      }
      return pt.name.toLowerCase() === decodeName.toLowerCase();
    });
    data.prodi = data.prodi.filter((prodi: any) => {
      if (!prodi.name) {
        return false;
      }
      return prodi.name.toLowerCase() === decodeName.toLowerCase();
    });
    data.mahasiswa = data.mahasiswa.filter((mahasiswa: any) => {
      if (!mahasiswa.name) {
        return false;
      }
      return mahasiswa.name.toLowerCase() === decodeName.toLowerCase();
    });
  } else if (req.query.startWith === "true") {
    //start with search
    data.dosen = data.dosen.filter((dosen: any) => {
      if (!dosen.name) {
        return false;
      }
      return dosen.name.toLowerCase().startsWith(decodeName.toLowerCase());
    });
    data.pt = data.pt.filter((pt: any) => {
      if (!pt.name) {
        return false;
      }
      return pt.name.toLowerCase().startsWith(decodeName.toLowerCase());
    });
    data.prodi = data.prodi.filter((prodi: any) => {
      if (!prodi.name) {
        return false;
      }
      return prodi.name.toLowerCase().startsWith(decodeName.toLowerCase());
    });
    data.mahasiswa = data.mahasiswa.filter((mahasiswa: any) => {
      if (!mahasiswa.name) {
        return false;
      }
      return mahasiswa.name.toLowerCase().startsWith(decodeName.toLowerCase());
    });
  } else if (req.query.endWith === "true") {
    //end with search
    data.dosen = data.dosen.filter((dosen: any) => {
      if (!dosen.name) {
        return false;
      }
      return dosen.name.toLowerCase().endsWith(decodeName.toLowerCase());
    });
    data.pt = data.pt.filter((pt: any) => {
      if (!pt.name) {
        return false;
      }
      return pt.name.toLowerCase().endsWith(decodeName.toLowerCase());
    });
    data.prodi = data.prodi.filter((prodi: any) => {
      if (!prodi.name) {
        return false;
      }
      return prodi.name.toLowerCase().endsWith(decodeName.toLowerCase());
    });
    data.mahasiswa = data.mahasiswa.filter((mahasiswa: any) => {
      if (!mahasiswa.name) {
        return false;
      }
      return mahasiswa.name.toLowerCase().endsWith(decodeName.toLowerCase());
    });
  } else if (req.query.contains === "true") {
    //contains search
    data.dosen = data.dosen.filter((dosen: any) => {
      if (!dosen.name) {
        return false;
      }
      return dosen.name.toLowerCase().includes(decodeName.toLowerCase());
    });
    data.pt = data.pt.filter((pt: any) => {
      if (!pt.name) {
        return false;
      }
      return pt.name.toLowerCase().includes(decodeName.toLowerCase());
    });
    data.prodi = data.prodi.filter((prodi: any) => {
      if (!prodi.name) {
        return false;
      }
      return prodi.name.toLowerCase().includes(decodeName.toLowerCase());
    });
    data.mahasiswa = data.mahasiswa.filter((mahasiswa: any) => {
      if (!mahasiswa.name) {
        return false;
      }
      return mahasiswa.name.toLowerCase().includes(decodeName.toLowerCase());
    });
  }

  res.send(data);
};

export { getData };
