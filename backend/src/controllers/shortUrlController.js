import { ShortURL } from "../models/shorturl.model.js";
import { nanoid} from "nanoid";



export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, title, expiresAt, customUrl } = req.body;
    const userId = req.user.id;

    let shortCode = customUrl || nanoid(8);

    const existingUrl = await ShortURL.findOne({ shortCode });

    if(existingUrl) {
      while(true) {
        shortCode = nanoid(8);
        const url = await ShortURL.findOne({ shortCode });
        if(!url) break;
      }
    }

    const newShortUrl = await ShortURL.create({
      originalUrl,
      title,
      expiresAt: String(expiresAt).length > 0 ? new Date(expiresAt) : null,
      shortCode,
      userId
    });

    console.log("printing new short url", newShortUrl);

    return res.status(200).json({
      message: "Short URL created successfully",
      data: newShortUrl
    });

  } catch (error) {
    console.error("Error in createShortUrl:", error.message);
    return res.status(500).json({
      message: "Error in creating short URL",
      error: error.message,
    });
  }

    
}


export const redirectToOriginalUrl = async (req, res)=>{
  try {
    const { shortCode } = req.params;
    const doc=await ShortURL.findOne({shortCode});
    if(!doc){
      return res.status(404).json({message:"Short URL not found"});
    }
    const originalUrl=doc.originalUrl;
    return res.redirect(originalUrl);
  }
    catch (err) {  
        console.error("Error in redirectToOriginalUrl:", err.message);
        return res.status(500).json({
          message: "Error in redirecting to original URL",
          error: err.message,
        });
      }
}           

export const updateshortUrlController = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const updatedData = req.body;
        const userId = req.user.id;         
        const existed = await ShortURL.findOne({ shortCode, userId });
        if (!existed) {
            return res.status(404).json({ 
                status : NOT_FOUND,
                message: "Short URL not found or you do not have permission to update it"
     });
        }
       Objects.assign(existed, updatedData);
        await existed.save();
        return res.status(200).json({
            message: "Short URL updated successfully",
            data: existed
        });
    } catch (err) {
        console.error("Error in updateshortUrlController:", err.message);
        return res.status(500).json({
            status : INTERNAL_SERVER_ERROR,
            message: "Error in updating short URL",
            error: err.message,
        });
    }
};
export const deleteShortUrlController = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const userId = req.user.id;         
        const existed = await ShortURL.findOne({ shortCode, userId });
        if (!existed) {
            return res.status(404).json({           
                message: "Short URL not found or you do not have permission to delete it"
        });
        }
        existed.isActive = false;
        await existed.save();
         await ShortURL.deleteOne({ shortCode, userId
        });
        return res.status(200).json({
            message: "Short URL deleted successfully",
        });
    } catch (err) {     
        console.error("Error in deleteShortUrlController:", err.message);
        return res.status(500).json({
            message: "Error in deleting short URL",
            error: err.message,
        });
    }
}